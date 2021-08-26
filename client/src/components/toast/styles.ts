import {
  Paper, Typography,
} from '@material-ui/core';
import styled, { css } from 'styled-components';

export const ToastsContainer = styled.div`
  // Show over material modal
  z-index: 1500;

  // sits on #root
  position: absolute;
  left: 50%;
  bottom: 1.5em;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
`;

export const ToastImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const ToastTypogrophy = styled(Typography)`
  padding: 0 1.5em;
`;

export const Toast = styled(Paper) <{ $isFadingOut?: boolean }>`
  display: flex;
  padding: 1em;
  margin: 0.5em 0;
  border: 3px solid #1cb0f6;
  align-items: center;

  -webkit-animation: fadein .3s linear forwards;
  animation: fadein .3s linear forwards;

  ${({ $isFadingOut }) => $isFadingOut
    && css`
      -webkit-animation: fadeout .3s linear forwards;
      animation: fadeout .3s linear forwards;
  `}

  @-webkit-keyframes fadein {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
      
  @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
  }
      
  @-webkit-keyframes fadeout {
      0% { opacity: 1; }
      100% { opacity: 0; }
  }
      
  @keyframes fadeout {
      0% { opacity: 1; }
      100% { opacity: 0; }
  }
`;
