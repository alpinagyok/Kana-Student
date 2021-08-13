import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const QuestionCont = styled.div`
  @media (min-width: 761px) {
    width: 40%;
  }
  padding-left: clamp(2em, 4vw, 3em);

  @media (max-width: 760px) {
    flex-basis: 100%;
    padding-left: 0;
  }
`;

export const CatContainer = styled.div`
  position: relative;

  @media (max-width: 760px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Cat = styled.img`
  width: 100%;
  @media (max-width: 760px) {
    display: none;
  }
`;

export const KanaQuestion = styled(Typography)`
  @media (max-width: 760px) {
    display: none;
  }
`;

export const MobileKanaQuestion = styled(Typography)`
  @media (min-width: 761px) {
    display: none;
  }
`;

export const DesktopKanaTypography = styled(Typography)`
  @media (max-width: 760px) {
    display: none;
  }
`;

export const Bubble = styled.div`
  @media (min-width: 761px) {
    position: absolute;
    left: 10%;
    bottom: 10%;
    background-color: #f6a33f;
    border: 4px solid #483026;
    border-radius: 20px;
    color: #da2c1b;
    margin: 0;
    width: 80%;
    height: 33.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
