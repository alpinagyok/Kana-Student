import React from 'react';
import { Kana } from '../../../store/interfaces';
import GuesserKanaCard from './GuesserKanaCard';
import { GuesserCont } from './styles';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
  handleKanaChoice: (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ) => void
}

const Guesser: React.FC<Props> = ({ randomKanas, kanaToGuess, handleKanaChoice }) => (
  <GuesserCont>
    {randomKanas.map((kana) => (
      <GuesserKanaCard handleKanaChoice={handleKanaChoice} kana={kana} kanaToGuess={kanaToGuess} />
    ))}
  </GuesserCont>
);

export default Guesser;
