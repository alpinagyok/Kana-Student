/* eslint-disable react/prop-types */
import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GUESSER_LESSON, WRITER_LESSON } from '../../store/interfaces';
import { setLessonType } from '../../store/lesson/reducer';
import { getPreparedKanas, getLessonType } from '../../store/lesson/selectors';
import {
  MaterialsContainer, PaperLessonType, StepperButton, StepperButtonsContainer,
} from './styles';

interface Props {
  decrementStep: () => void
}

const LessonTypeChooser: React.FC<Props> = ({ decrementStep }) => {
  const dispatch = useDispatch();
  const preparedKanas = useSelector(getPreparedKanas);
  const lessonType = useSelector(getLessonType);

  return (
    <>
      <MaterialsContainer>
        {[GUESSER_LESSON, WRITER_LESSON].map((lesson) => (
          <PaperLessonType
            elevation={lessonType === lesson ? 10 : 3}
            $selected={lessonType === lesson}
            onClick={() => {
              dispatch(setLessonType(lesson));
            }}
          >
            <Typography variant="h5" align="center">
              {lesson}
            </Typography>
          </PaperLessonType>
        ))}
      </MaterialsContainer>

      <StepperButtonsContainer>
        <StepperButton onClick={() => decrementStep()} size="large" variant="outlined" color="primary">
          Back
        </StepperButton>

        {preparedKanas && preparedKanas?.length > 3 && lessonType && (
          <Link style={{ textDecoration: 'none' }} to="/lesson">
            <StepperButton size="large" variant="outlined" color="primary">
              Next
            </StepperButton>
          </Link>
        )}
      </StepperButtonsContainer>
    </>
  );
};

export default LessonTypeChooser;
