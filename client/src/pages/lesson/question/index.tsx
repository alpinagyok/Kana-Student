import React from 'react';
import { Kana, SimplifiedMaterialBlock } from '../../../store/interfaces';
import {
  QuestionCont, CatContainer, Cat, Bubble, DesktopKanaTypography, MobileKanaQuestion, KanaQuestion,
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
    <KanaQuestion align="center" variant="h5">
      What is this
      {' '}
      {selectedMaterial.name}
      ?
    </KanaQuestion>

    <MobileKanaQuestion align="center" variant="h5">
      What is the
      {' '}
      {selectedMaterial.name}
      {' '}
      for
      {' '}
      <b>{kanaToGuess.romName}</b>
      ?
    </MobileKanaQuestion>
  </QuestionCont>
);

export default LessonQuestion;
