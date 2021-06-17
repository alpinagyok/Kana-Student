import React from 'react';
import { MaterialName } from '../../store/interfaces';

interface Props {
  selectedMaterial: string | undefined;
}

const LessonQuestion: React.FC<Props> = ({ selectedMaterial }) => {
  const a = 1;

  return (
    <div>
      <h1>
        This is tab
        {' '}
        {selectedMaterial}
      </h1>
    </div>
  );
};

export default LessonQuestion;
