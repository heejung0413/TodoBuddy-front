import styled from 'styled-components';
import { colors } from '../theme/styled-components/palette';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .react-calendar {
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 20px;
    background-color: white;
    width: fit-content;
    max-width: 600px;
  }
  .react-calendar__navigation button:disabled {
    background-color: white;
    width: 100%;
  }
  .react-calendar__tile--now {
    background: ${colors.brand[50]};
  }
  .react-calendar__navigation__label > span {
    // 달력 상단 년/월 글씨 커스텀

    font-size: 30px;

    font-weight: 500;
    line-height: 140%;
  }
  .react-calendar__navigation {
    justify-content: center;
    min-width: 100%;
    margin: 0 auto;
    font-size: 30px;
  }
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1em;
  }
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.gray_1};
  }
  .react-calendar__tile--hasActive {
    color: black;
    abbr {
      color: black;
    }
  }
  .react-calendar__month-view__weekdays__weekday--weekend:nth-of-type(1) {
    color: red;
  }
  .react-calendar__month-view__weekdays__weekday:nth-of-type(7) {
    color: blue; /* 토요일을 파란색으로 표시 */
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    abbr {
      // 텍스트 부분
      font-size: 18px;
    }
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
  .react-calendar__tile {
    height: 100px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    //hover 했을 때 색상 변경
    background: ${colors.brand[300]};
  }
`;
export const StyledCalendar = styled(Calendar)``;

export const StyledToday = styled.div`
  font-size: x-small;
  color: red;
  font-weight: 600;
  margin: 10px;
`;

export const StyledDot = styled.div`
  background-color: red;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  margin: 10px auto;
  transform: translateX(-50%);
`;
