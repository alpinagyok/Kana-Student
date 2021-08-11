import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Kana } from '../../../store/interfaces';
import { PaperGuesser, PaperGuesserWrapper } from './styles';

interface Props {
  handleKanaChoice: (chosenKana: Kana, kanaToGuess: Kana) => void;
  kana: Kana;
  kanaToGuess: Kana;
}

const GuesserKanaCard: React.FC<Props> = ({ handleKanaChoice, kana, kanaToGuess }) => {
  const [hover, setHover] = useState(false);

  return (
    <PaperGuesserWrapper
      key={kana.romName}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <PaperGuesser
        elevation={hover ? 10 : 3}
        $selected={hover}
        onClick={() => {
          setHover(false);
          handleKanaChoice(kana, kanaToGuess);
        }}
      >
        <Typography variant="h3" align="center">
          {kana.japName}
        </Typography>
      </PaperGuesser>
    </PaperGuesserWrapper>
  );
};

export default GuesserKanaCard;
