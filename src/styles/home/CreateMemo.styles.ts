import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 20px 100px;
  text-align: center;
  display: flex;
  gap: 10px;
  @media (max-width: 768px) {
    margin: 20px 50px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const CategoryInputBox = styled.div`
  display: flex;
  flex-grow: 1;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 3px;
  }
`;
