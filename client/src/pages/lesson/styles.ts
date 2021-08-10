import { Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';

export const LessonPageContainer = styled.div`
  padding: 2em 0;

  @media (min-width: 761px) {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const QuestionCont = styled.div`
  flex-basis: 40%;
  margin: 0 0 0 4em;

  @media (max-width: 760px) {
    flex-basis: 100%;
    margin: 0;
  }
`;

export const LessonCont = styled.div`
  flex: 1;

  @media (max-width: 760px) {
    margin: auto;
  }
  
  padding: 2em 0;
  max-width: 500px;
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
