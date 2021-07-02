import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { Kana, WRITER_LESSON } from '../../store/interfaces';
import { setStreak, shufflePreparedKanas } from '../../store/lesson/reducer';
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [correctKana, setCorrectKana] = useState<Kana>();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (!selectedMaterial || !preparedKanas || preparedKanas?.length < 4) history.push('/learn');
    else if (!currentKana) {
      dispatch(shufflePreparedKanas());
    }

    Modal.setAppElement('body');
  }, []);

  const handleKanaChoice = (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ): void => {
    setIsAnswerCorrect(chosenKana.id === kanaToGuess.id);
    setIsOpen(true);
    setCorrectKana(currentKana);
    dispatch(shufflePreparedKanas());
    dispatch(setStreak(chosenKana.id === kanaToGuess.id));
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
        contentLabel="Example Modal"
      >
        <button type="button" onClick={() => setIsOpen(false)}>close</button>
        {correctKana && (
          <div>
            your anwser was
            {' '}
            {isAnswerCorrect ? 'correct' : 'wrong'}
            :
            {' '}
            {correctKana.japName}
            {' '}
            (
            {correctKana.romName}
            )
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Lesson;
