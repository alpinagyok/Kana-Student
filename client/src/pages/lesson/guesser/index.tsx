import React from 'react';
import { Kana } from '../../../store/interfaces';
import GuesserKanaCard from './GuesserKanaCard';
import { LessonCont } from '../styles';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
  handleKanaChoice: (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ) => void
}

const Guesser: React.FC<Props> = ({ randomKanas, kanaToGuess, handleKanaChoice }) => (
  <LessonCont>
    {randomKanas.map((kana) => (
      <GuesserKanaCard handleKanaChoice={handleKanaChoice} kana={kana} kanaToGuess={kanaToGuess} />
    ))}
  </LessonCont>
);

export default Guesser;
