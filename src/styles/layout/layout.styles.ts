import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: sticky;
  z-index: 999;
  padding: 100px auto;
  background-color: white;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.3);
`;

export const LoginText = styled.p`
  font-size: 1rem;
  color: gray;
  margin: auto 0;
  &:hover {
    cursor: pointer;
  }
`;
