import React from 'react';
import { Kana, SimplifiedMaterialBlock } from '../../store/interfaces';
import { QuestionCont } from './styles';

interface Props {
  selectedMaterial: SimplifiedMaterialBlock;
  kanaToGuess: Kana;
}

const LessonQuestion: React.FC<Props> = ({ selectedMaterial, kanaToGuess }) => (
  <QuestionCont>
    <h1>
      This is tab
      {' '}
      {selectedMaterial.name}
    </h1>
    <h1>
      What is this kana?
      {' '}
      {kanaToGuess.romName}
    </h1>
  </QuestionCont>
);

export default LessonQuestion;
