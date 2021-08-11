import styled from 'styled-components';

export const LessonPageContainer = styled.div`
  padding: 2em 0;

  @media (min-width: 761px) {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
`;

export const QuestionCont = styled.div`
  flex-basis: 40%;
  margin-left: clamp(2em, 4vw, 4em);

  @media (max-width: 760px) {
    flex-basis: 100%;
    margin-left: 0;
  }
`;

export const LessonCont = styled.div`
  flex: 1;

  @media (max-width: 760px) {
    margin: auto;
  }
  
  padding: 2em 0;
  max-width: 500px;
`;
