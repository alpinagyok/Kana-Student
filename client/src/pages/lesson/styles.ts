import styled from 'styled-components';

export const LessonPageContainer = styled.div`
  padding: 2em 0;

  @media (min-width: 761px) {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
`;

export const LessonCont = styled.div`
  width: 60%;

  @media (max-width: 760px) {
    margin: auto;
    width: 100%;
  }
  
  padding: 2em 0;
  max-width: 500px;
`;
