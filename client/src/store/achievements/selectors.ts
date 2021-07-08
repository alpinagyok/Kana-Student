import { GetState } from '..';
import { Achievement, FetchStatus } from '../interfaces';

export const getAchievements = (state: GetState): Achievement[] => state.achievements.achievements;
export const getAchievementsStatus = (state: GetState): FetchStatus => state.achievements.status;
export const getAchievementsError = (
  state: GetState,
): string | undefined => state.achievements.error;
