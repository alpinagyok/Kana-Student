import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
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
import Guesser from './Guesser';
import LessonQuestion from './LessonQuestion';
import Writer from './Writer';
import { useAuth } from '../../contexts/authContext';
import reactToKanaChoice from '../../service/achievements';

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, addUserAchievements } = useAuth();

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
    if (!selectedMaterial || !preparedKanas || preparedKanas?.length < 4) history.push('/learn');
    else if (!currentKana) {
      dispatch(shufflePreparedKanas());
    }

    Modal.setAppElement('body');
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
    <div>
      { selectedMaterial && preparedKanas && preparedKanas?.length > 3 && currentKana
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
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Choose correct kana"
      >
        <button type="button" onClick={() => setIsOpen(false)}>close</button>
        {correctKana && chosentKana && (
          <div>
            {`your anwser was ${isAnswerCorrect ? 'correct' : 'wrong'}`}
            {`correct answer: ${correctKana.japName} (${correctKana.romName})`}
            {`your answer: ${chosentKana.japName} (${chosentKana.romName})`}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Lesson;
