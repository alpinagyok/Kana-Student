import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { WRITER_LESSON } from '../../store/interfaces';
import { getLessonType, getPreparedKanas, getSelectedMaterialsBlockID } from '../../store/lesson/selectors';
import Guesser from './Guesser';
import LessonQuestion from './LessonQuestion';
import Writer from './Writer';

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedMaterial = useSelector(getSelectedMaterialsBlockID);
  const preparedKanas = useSelector(getPreparedKanas);
  const lessonType = useSelector(getLessonType);

  useEffect(() => {
    if (!selectedMaterial || !preparedKanas || preparedKanas?.length < 4) history.push('/learn');
  }, []);

  const lessonComp = lessonType === WRITER_LESSON ? <Writer /> : <Guesser />;

  return (
    <div>
      <LessonQuestion selectedMaterial={selectedMaterial} />
      {lessonComp}
    </div>
  );
};

export default Lesson;
