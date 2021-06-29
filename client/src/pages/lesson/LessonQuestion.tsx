import React from 'react';
import { Kana, SimplifiedMaterialBlock } from '../../store/interfaces';

interface Props {
  selectedMaterial: SimplifiedMaterialBlock;
  kanaToGuess: Kana;
}

const LessonQuestion: React.FC<Props> = ({ selectedMaterial, kanaToGuess }) => (
  <div>
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
  </div>
);

export default LessonQuestion;
