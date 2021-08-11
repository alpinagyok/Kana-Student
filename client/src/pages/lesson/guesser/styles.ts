import { Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { LessonCont } from '../styles';

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
