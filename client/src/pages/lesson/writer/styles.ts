import { Button } from '@material-ui/core';
import styled, { css } from 'styled-components';

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

export const CanvasWrapper = styled.div<{ $size: number }>`
  position: relative;
  border: 1px solid black;
  ${({ $size }) => $size
    && css`
    color: #1cb0f6;
    width: ${$size}px;
    height: ${$size}px;
  `}
`;

const Line = styled.div`
  position: absolute;
`;

export const LeftLine = styled(Line)<{ $size: number; $borderRation: number }>`
  ${({ $size, $borderRation }) => $size && $borderRation
    && css`
    height: ${$size}px;
    top: 0;
    left: ${$size * $borderRation}px;
    border-left: 1px black dotted;
  `}
`;

export const RightLine = styled(Line)<{ $size: number; $borderRation: number }>`
  ${({ $size, $borderRation }) => $size && $borderRation
    && css`
    height: ${$size}px;
    top: 0;
    right: ${$size * $borderRation}px;
    border-right: 1px black dotted;
  `}
`;

export const TopLine = styled(Line)<{ $size: number; $borderRation: number }>`
  ${({ $size, $borderRation }) => $size && $borderRation
    && css`
    width: ${$size}px;
    top: ${$size * $borderRation}px;
    left: 0;
    border-top: 1px black dotted;
  `}
`;

export const BottomLine = styled(Line)<{ $size: number; $borderRation: number }>`
  ${({ $size, $borderRation }) => $size && $borderRation
    && css`
    width: ${$size}px;
    bottom: ${$size * $borderRation}px;
    left: 0;
    border-bottom: 1px black dotted;
  `}
`;
