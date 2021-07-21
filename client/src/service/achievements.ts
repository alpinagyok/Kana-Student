import checkForNewAchievements from '../api/achievements';
import { LessonType } from '../store/interfaces';

const reactToKanaChoice = async (
  materialId: string,
  lessonType: LessonType,
  successStreak: number,
  totalAnswers: number,
  addUserAchievements: ((newAchievs: string[]) => void) | undefined,
): Promise<void> => {
  const newAchievements = await checkForNewAchievements(
    materialId,
    lessonType,
    successStreak, totalAnswers,
  );
  if (addUserAchievements) {
    addUserAchievements([...newAchievements]);
  }
  // TODO: some sort of toast / popup
};

export default reactToKanaChoice;
