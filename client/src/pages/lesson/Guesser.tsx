import React from 'react';
import { handleKanaChoice } from '../../service/lesson';
import { Kana } from '../../store/interfaces';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
}

const Guesser: React.FC<Props> = ({ randomKanas, kanaToGuess }) => (
  <div>
    {randomKanas.map((kana) => (
      <button key={kana.id} type="button" onClick={() => handleKanaChoice(kana, kanaToGuess)}>{kana.japName}</button>
    ))}
    <h1>{kanaToGuess.japName}</h1>
  </div>
);

export default Guesser;
