import { GetState } from '..';
import {
  Kana, LessonType, SimplifiedMaterialBlock,
} from '../interfaces';

export const getSelectedMaterialsBlock = (state: GetState): SimplifiedMaterialBlock | undefined => (
  state.lesson.selectedMaterialsBlock);
export const getPreparedKanas = (state: GetState): Kana[] | undefined => state.lesson.preparedKanas;
export const getLessonType = (state: GetState): LessonType | undefined => state.lesson.lessonType;
export const getCurrentKana = (state: GetState): Kana | undefined => state.lesson.currentKana;
export const getSuccessStreak = (state: GetState): number => state.lesson.successStreak;
export const getTotalAnswers = (state: GetState): number => state.lesson.totalAnswers;
