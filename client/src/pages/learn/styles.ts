import { Button, Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';

export const LessonStarterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2em;

`;

export const MaterialsContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  margin: 2em 0;
`;

export const SelectableKanasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-basis: 100%;
  margin-bottom: 2.5em;
`;

export const PaperMaterial = styled(Paper)<{$selected?: boolean}>`
  padding: 2em;
  margin: clamp(0em, 1.5vw, 1em);
  cursor: pointer;
  transition: all 0.5s ease;
  ${({ $selected }) => $selected
    && css`
      color: #1cb0f6;
  `}
`;

export const PaperKana = styled(Paper)<{$selected?: boolean}>`
  padding: 0.5em;
  margin: 0.3em;
  cursor: pointer;
  transition: all 0.5s ease;
  ${({ $selected }) => $selected
    && css`
      color: #1cb0f6;
  `}
`;

export const KanaRow = styled.div`
  display: flex;
  align-items: center;
`;

export const KanaRowsBlock = styled.div`
  padding: 0 clamp(0em, 1.5vw, 1.5em);;
`;

export const KanaPapersBlock = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const AddRemoveButton = styled(Button)`
  min-width: 0px;
  border-radius: 20px;
  font-size: 1.6em;
`;
