import { Button, Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';

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

export const GuesserCont = styled(LessonCont)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
`;

export const PaperGuesserWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
`;

export const PaperGuesser = styled(Paper) <{ $selected?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: color 0.5s ease, box-shadow 0.5s ease;
  ${({ $selected }) => $selected
    && css`
      color: #1cb0f6;
  `}
`;

export const CanvasButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 0.25em;
`;

export const CanvasButton = styled(Button)`
  margin: 0.25em 0 0.25em 0.5em;
`;

export const CanvasIcon = styled.div`
  font-size: clamp(2em, 10vw, 4em);
`;
