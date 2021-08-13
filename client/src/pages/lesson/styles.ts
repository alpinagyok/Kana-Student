import styled from 'styled-components';

export const LessonPageContainer = styled.div`
  padding-top: clamp(1.2em, 3vw, 2em);
  padding-bottom: clamp(1.2em, 3vw, 2em);

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
  
  padding-top: clamp(1.2em, 3vw, 2em);
  max-width: 500px;
`;
