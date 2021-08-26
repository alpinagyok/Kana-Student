import {
  Paper,
} from '@material-ui/core';
import styled, { css } from 'styled-components';

export const ToastsContainer = styled.div`
  z-index: 1500;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
`;

export const Toast = styled(Paper) <{ $isFadingOut?: boolean }>`
  width: clamp(200px, 80vw, 800px);
  padding: 2em;

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
