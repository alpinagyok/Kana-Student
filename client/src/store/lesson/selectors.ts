import { GetState } from '..';
import {
  Kana, SimplifiedMaterialBlock,
} from '../interfaces';

export const getSelectedMaterialsBlock = (state: GetState): SimplifiedMaterialBlock | undefined => (
  state.lesson.selectedMaterialsBlock);
export const getPreparedKanas = (state: GetState): Kana[] | undefined => state.lesson.preparedKanas;
export const getLessonType = (state: GetState): string | undefined => state.lesson.lessonType;
export const getCurrentKana = (state: GetState): Kana | undefined => state.lesson.currentKana;
