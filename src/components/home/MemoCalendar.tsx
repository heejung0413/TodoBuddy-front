import moment from 'moment';
import { GrPowerReset } from 'react-icons/gr';
import * as S from '@/styles/home/MemoCalendar.styles';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';

export const convertToLocalTime = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return localTime.toLocaleString(undefined, options); // 로컬 타임존으로 변환하여 문자열로 반환
};

const MemoCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [todayReset, setTodayReset] = useState<Boolean>(true);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());

  const attendDay = ['2023-12-03', '2023-12-13'];

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleDayClick = date => {
    setTodayReset(false);
    console.log(date); // 클릭된 날짜를 콘솔에 출력
    setDate(date); // 선택된 날짜를 상태로 설정 (선택 사항)
  };

  const handleTodayClick = () => {
    setTodayReset(true);
    const today = new Date();
    console.log(date);
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <S.Container>
      <Button onClick={handleTodayClick} colorScheme="brand" width="fit-content" mb={5}>
        <GrPowerReset />
      </Button>
      <S.StyledCalendar
        value={todayReset ? today : date}
        calendarType="gregory"
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month"
        tileContent={({ date, view }) => {
          let html: JSX.Element[] = [];
          if (view === 'month' && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
            html.push(<S.StyledToday key={'today'}>오늘</S.StyledToday>);
          }
          if (attendDay.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<S.StyledDot key={moment(date).format('YYYY-MM-DD')} />);
          }
          return <div style={{ display: 'flex', justifyContent: 'center' }}>{html}</div>;
        }}
        onClickDay={handleDayClick}
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
      ></S.StyledCalendar>
    </S.Container>
  );
};

export default MemoCalendar;
