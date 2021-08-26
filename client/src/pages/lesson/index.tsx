import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Kana, WRITER_LESSON } from '../../store/interfaces';
import { setStreak, shufflePreparedKanas } from '../../store/lesson/reducer';
import {
  getCurrentKana,
  getLessonType,
  getPreparedKanas,
  getSelectedMaterialsBlock,
  getSuccessStreak,
  getTotalAnswers,
} from '../../store/lesson/selectors';
import Guesser from './guesser';
import LessonQuestion from './question';
import Writer from './writer';
import { useAuth } from '../../contexts/authContext';
import reactToKanaChoice from '../../service/achievements';
import { LessonPageContainer } from './styles';
import {
  ModalButton, ModalButtons, ModalPaper, StyledModal,
} from '../../components/styles';
import { useToast } from '../../contexts/toastContext';

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, addUserAchievements } = useAuth();
  const { addToast } = useToast();

  const selectedMaterial = useSelector(getSelectedMaterialsBlock);
  const preparedKanas = useSelector(getPreparedKanas);
  const lessonType = useSelector(getLessonType);
  const currentKana = useSelector(getCurrentKana);

  const successStreak = useSelector(getSuccessStreak);
  const totalAnswers = useSelector(getTotalAnswers);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [correctKana, setCorrectKana] = useState<Kana>();
  const [chosentKana, setChosentKana] = useState<Kana>();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (!lessonType || !selectedMaterial || !preparedKanas || preparedKanas?.length < 4) history.push('/learn');
    else if (!currentKana) {
      dispatch(shufflePreparedKanas());
    }
  }, []);

  // Check for new achievements
  // done in useEffect and not in handleKanachoice to avoid dispatch lag
  useEffect(() => {
    if (user) {
      reactToKanaChoice(
        selectedMaterial?.id ?? '',
        lessonType ?? WRITER_LESSON,
        successStreak, totalAnswers,
        addUserAchievements,
        addToast,
      );
    }
  }, [totalAnswers]);

  const handleKanaChoice = (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ): void => {
    setChosentKana(chosenKana);
    setIsAnswerCorrect(chosenKana.japName === kanaToGuess.japName);
    setIsOpen(true);
    setCorrectKana(currentKana);
    dispatch(shufflePreparedKanas());
    dispatch(setStreak(chosenKana.japName === kanaToGuess.japName));
  };

  return (
    <>
      <LessonPageContainer>
        {lessonType && selectedMaterial
        && preparedKanas && preparedKanas?.length > 3 && currentKana
        && (
        <>
          <LessonQuestion selectedMaterial={selectedMaterial} kanaToGuess={currentKana} />
          { lessonType === WRITER_LESSON
            ? (
              <Writer
                randomKanas={preparedKanas.slice(0, 4)}
                kanaToGuess={currentKana}
                handleKanaChoice={handleKanaChoice}
                selectedMaterial={selectedMaterial}
              />
            ) : (
              <Guesser
                randomKanas={preparedKanas.slice(0, 4)}
                kanaToGuess={currentKana}
                handleKanaChoice={handleKanaChoice}
              />
            )}
        </>
        )}
      </LessonPageContainer>
      <StyledModal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
      >
        <ModalPaper>
          <Typography color={isAnswerCorrect ? 'primary' : 'error'} gutterBottom variant="h4" align="center">
            {isAnswerCorrect ? 'Correct!' : 'Wrong :('}
          </Typography>
          {correctKana && chosentKana && (
          <>
            <Typography variant="h5" align="center">
              Your answer:
              {' '}
              {chosentKana.japName}
              {' '}
              (
              {chosentKana.romName}
              )
            </Typography>
            {!isAnswerCorrect && (
            <Typography variant="h5" align="center">
              Correct answer:
              {' '}
              {correctKana.japName}
              {' '}
              (
              {correctKana.romName}
              )
            </Typography>
            )}
          </>
          )}
          <ModalButtons>
            <ModalButton color="primary" variant="outlined" onClick={() => setIsOpen(false)}>
              Close
            </ModalButton>
          </ModalButtons>
        </ModalPaper>
      </StyledModal>
    </>
  );
};

export default Lesson;
