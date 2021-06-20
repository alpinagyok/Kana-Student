import { Kana } from '../store/interfaces';
import { shufflePreparedKanas } from '../store/lesson/reducer';
import store from '../store';

export const handleKanaChoice = (
  chosenKana: Kana,
  kanaToGuess: Kana,
): void => {
  if (chosenKana.id === kanaToGuess.id) {
    console.log('correct');
  } else {
    console.log('wrong');
  }

  store.dispatch(shufflePreparedKanas());
};

export default handleKanaChoice;
