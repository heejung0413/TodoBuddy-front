import moment from 'moment';
import { GrPowerReset } from 'react-icons/gr';
import * as S from '@/styles/home/MemoCalendar.styles';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MemoServices } from '@/api/Services/Memo';
import { MemoData } from '@/api/@types/Memo';

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
  return localTime.toLocaleString(undefined, options);
};

const MemoCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [todayReset, setTodayReset] = useState<Boolean>(true);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(today);
  const [memo, setMemo] = useState<MemoData[]>([]);

  const fetchMemo = async () => {
    try {
      const result = await MemoServices.get({ memoStatus: 'NOT_COMPLETED' });
      setMemo(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(memo);

  useEffect(() => {
    fetchMemo();
  }, []);

  const attendDay1 = ['2024-08-30', '2023-12-13'];

  // const attendDay = memo
  //   .map(value => {
  //     if (value.memoDeadline) {
  //       return value.memoDeadline.split('T')[0];
  //     } else {
  //       return null;
  //     }
  //   })
  //   .filter(date => date !== null); // null 값을 필터링하여 유효한 날짜만 유지  (value.memoDeadline || '').split('T')[0];

  const attendDay =
    memo &&
    memo
      .filter(value => value.memoDeadline !== '')
      .map(value => {
        const date = (value.memoDeadline || '').split('T')[0];
        if (date) {
          return date;
        } else {
          console.error('Invalid date format:', value.memoDeadline);
          return '';
        }
      });

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleDayClick = date => {
    setTodayReset(false);
    setDate(date);
  };

  const handleTodayClick = () => {
    setTodayReset(true);
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <S.Container>
      <Button onClick={handleTodayClick} colorScheme="brand" width="fit-content" mb={5} mx="auto" gap={3}>
        <GrPowerReset /> 오늘로 돌아가기
      </Button>
      <S.StyledCalendar
        value={todayReset ? today : date}
        calendarType="gregory"
        onChange={handleDateChange}
        formatDay={(_, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
        formatYear={(_, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(_, date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
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
          if (attendDay1.find(x => x === moment(date).format('YYYY-MM-DD'))) {
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
