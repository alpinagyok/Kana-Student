import { GetState } from '..';
import { FetchStatus, Kana, MaterialBlock } from '../interfaces';

export const getSelectedMaterialsBlockID = (state: GetState): string | undefined => (
  state.lesson.selectedMaterialsBlock);
export const getPreparedKanas = (state: GetState): Kana[] | undefined => state.lesson.preparedKanas;
export const getLessonType = (state: GetState): string | undefined => state.lesson.lessonType;
