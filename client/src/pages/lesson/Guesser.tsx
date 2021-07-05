import React from 'react';
import { Kana } from '../../store/interfaces';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
  handleKanaChoice: (
    chosenKanaName: string,
    kanaToGuess: Kana,
  ) => void
}

const Guesser: React.FC<Props> = ({ randomKanas, kanaToGuess, handleKanaChoice }) => (
  <div>
    {randomKanas.map((kana) => (
      <button key={kana.id} type="button" onClick={() => handleKanaChoice(kana.japName, kanaToGuess)}>{kana.japName}</button>
    ))}
  </div>
);

export default Guesser;
