import React from 'react';
import { Typography } from '@material-ui/core';
import { Kana, SimplifiedMaterialBlock } from '../../../store/interfaces';
import {
  QuestionCont, CatContainer, Cat, Bubble, MobileKanaTypography, DesktopKanaTypography,
} from './styles';
import catImg from './lucky-cat.png';

interface Props {
  selectedMaterial: SimplifiedMaterialBlock;
  kanaToGuess: Kana;
}

const LessonQuestion: React.FC<Props> = ({ selectedMaterial, kanaToGuess }) => (
  <QuestionCont>
    <CatContainer>
      <Cat src={catImg} alt="" />
      <Bubble>
        <DesktopKanaTypography variant="h2">
          {kanaToGuess.romName}
        </DesktopKanaTypography>
      </Bubble>
    </CatContainer>
    <Typography align="center" variant="h5">
      What is this
      {' '}
      {selectedMaterial.name}
      ?
    </Typography>
    <MobileKanaTypography align="center" variant="h4">
      {kanaToGuess.romName}
    </MobileKanaTypography>

  </QuestionCont>
);

export default LessonQuestion;
