import styled from 'styled-components';
import { colors } from '../theme/styled-components/palette';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 20px;
  .react-calendar {
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }
  .react-calendar__navigation__label > span {
    // 달력 상단 년/월 글씨 커스텀
    color: var(--festie-gray-800, #3a3a3a);
    font-size: 30px;

    font-weight: 500;
    line-height: 140%;
  }
  .react-calendar__navigation {
    justify-content: space-around;
    min-width: 100%;
    margin: 0 auto;
    font-size: 30px;
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
