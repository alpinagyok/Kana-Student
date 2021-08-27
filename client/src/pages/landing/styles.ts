import styled, { css } from 'styled-components';

export const TutorialItem = styled.div<{ $reverse?: boolean }>`
  padding: 2em 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    padding-bottom: 1.5em;
    padding-right: 3em;
  }

  ${({ $reverse }) => $reverse
    && css`
      flex-direction: row-reverse;

      div {
        padding-left: 3em;
        padding-right: 0;
      }
  `}

  @media (max-width: 760px) {
    flex-direction: column;
    text-align: center;

    div {
      padding-right: 0;
      padding-left: 0;
    }
  }
`;

export const TutorialImg = styled.img`
  width: 50%;
  // padding: 2em;
  @media (max-width: 760px) {
    width: 100%;
  }
`;
