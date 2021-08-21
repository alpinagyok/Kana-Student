import { Paper, Typography } from '@material-ui/core';
import styled, { css } from 'styled-components';

export const AchievementsCont = styled.div<{ $available?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4em 0;
  ${({ $available }) => !$available
    && css`
      filter: blur(4px);
  `}
`;

export const AchievemntPaper = styled(Paper)`
  position: relative;
  overflow: hidden;
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 250px;
  padding: 1em;
  margin: 0.7em;
  transition: color 0.5s ease, box-shadow 0.5s ease;
`;

export const AchievementImage = styled.img`
  width: 80px;
  margin: auto;
  padding-bottom: 1em;
`;

export const Ribbon = styled(Typography)`
  margin: 0;
  padding: 0;
  background: #1cb0f6;
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
  
  :before, :after {
    content: '';
    position: absolute;
    top:0;
    margin: 0 -1px; /* tweak */
    width: 100%;
    height: 100%;
    background: #1cb0f6;
  }
  
  :before {
    right: 100%;
  }

  :after {
    left: 100%;
  }
`;
