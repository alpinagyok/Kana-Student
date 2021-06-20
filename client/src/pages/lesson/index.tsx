import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { WRITER_LESSON } from '../../store/interfaces';
import { shufflePreparedKanas } from '../../store/lesson/reducer';
import {
  getCurrentKana, getLessonType, getPreparedKanas, getSelectedMaterialsBlock,
} from '../../store/lesson/selectors';
import Guesser from './Guesser';
import LessonQuestion from './LessonQuestion';
import Writer from './Writer';

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedMaterial = useSelector(getSelectedMaterialsBlock);
  const preparedKanas = useSelector(getPreparedKanas);
  const lessonType = useSelector(getLessonType);
  const currentKana = useSelector(getCurrentKana);

  useEffect(() => {
    if (!selectedMaterial || !preparedKanas || preparedKanas?.length < 4) history.push('/learn');
    else if (!currentKana) {
      dispatch(shufflePreparedKanas());
    }
  }, []);

  return (
    <div>
      { selectedMaterial && preparedKanas && preparedKanas?.length > 3 && currentKana
      && (
      <>
        <LessonQuestion selectedMaterial={selectedMaterial} />
        { lessonType === WRITER_LESSON
          ? <Writer /> : (
            <Guesser
              randomKanas={preparedKanas.slice(0, 4)}
              kanaToGuess={currentKana}
            />
          )}
      </>
      )}

    </div>
  );
};

export default Lesson;
