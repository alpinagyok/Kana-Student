import {
  Button, Modal, Paper, TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledSpan = styled.span`
  color: currentColor;
  font-size: 0.9em;
  background: none;
  border: none;
  padding: 0 0.3em;
  font-weight: 600;
  text-transform: uppercase;
  @media (max-width: 820px) {
    display: none;
  }
`;

export const StyledNavItem = styled(Link)<{$isGrowing?: boolean, $selected?: boolean, $hidden?: boolean}>`
  display: flex;
  ${({ $isGrowing }) => $isGrowing
    && css`
      flex-grow: 1;
  `}
  align-items: center;
  color: gray;
  ${({ $selected }) => $selected
    && css`
      color: #1cb0f6;
  `}
  transition: all 0.5s ease;
  font-size: 1.2em;
  padding-left: clamp(0em, 1.5vw, 1em);
  padding-right: clamp(0em, 1.5vw, 1em);
  cursor: pointer;
  text-decoration: inherit;
  @media (max-width: 820px) {
    flex-grow: 1;
    justify-content: center;
    width: 0;
  }
  ${({ $hidden }) => $hidden
    && css`
      flex-grow: 0 !important;
      overflow: hidden !important;
      padding: 0 !important;
      width: 0 !important;
  `}
`;

export const StyledIcon = styled.div`
  padding: 0 0.3em;
  color: currentColor;
  font-size: 1.4em;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;

  background-color: rgb(0 0 0 / 70%);;
`;

export const ModalPaper = styled(Paper)`
  padding: 1em;
  overflow-x: hidden;
`;

export const ModalButtons = styled.div`
  display: flex;
  margin-top: 2em;
  justify-content: center;
`;

export const ModalButton = styled(Button)`
  margin: 0.5em;
`;

export const ModalFields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalTextField = styled(TextField)`
  margin: 0.5em;
`;
