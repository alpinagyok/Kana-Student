import React from 'react';
import { SimplifiedMaterialBlock } from '../../store/interfaces';

interface Props {
  selectedMaterial: SimplifiedMaterialBlock;
}

const LessonQuestion: React.FC<Props> = ({ selectedMaterial }) => (
  <div>
    <h1>
      This is tab
      {' '}
      {selectedMaterial.name}
    </h1>
  </div>
);

export default LessonQuestion;
