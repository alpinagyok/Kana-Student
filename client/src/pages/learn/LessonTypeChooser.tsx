/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GUESSER_LESSON, WRITER_LESSON } from '../../store/interfaces';
import { setLessonType } from '../../store/lesson/reducer';
import { getPreparedKanas, getLessonType } from '../../store/lesson/selectors';

interface Props {
  decrementStep: () => void
}

const LessonTypeChooser: React.FC<Props> = ({ decrementStep }) => {
  const dispatch = useDispatch();
  const preparedKanas = useSelector(getPreparedKanas);
  const lessonType = useSelector(getLessonType);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(setLessonType(GUESSER_LESSON));
        }}
      >
        {GUESSER_LESSON}
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(setLessonType(WRITER_LESSON));
        }}
      >
        {WRITER_LESSON}
      </button>
      <button type="button" onClick={() => decrementStep()}>Back</button>
      {preparedKanas && preparedKanas?.length > 3 && lessonType && (
      <Link to="/lesson">Next</Link>
      )}
    </div>
  );
};

export default LessonTypeChooser;
