import checkForNewAchievements from '../api/achievements';
import { IToast } from '../contexts/toastContext';
import { LessonType } from '../store/interfaces';

const reactToKanaChoice = async (
  materialId: string,
  lessonType: LessonType,
  successStreak: number,
  totalAnswers: number,
  addUserAchievements: ((newAchievs: string[]) => void) | undefined,
  addToast: ((newToast: IToast) => void) | undefined,
): Promise<void> => {
  const newAchievements = await checkForNewAchievements(
    materialId,
    lessonType,
    successStreak, totalAnswers,
  );
  if (addUserAchievements) {
    addUserAchievements([...newAchievements.map((ach) => ach.id)]);
  }
  // Popup toasts for new achievements
  if (addToast) {
    newAchievements.forEach((achievement) => {
      const {
        id, name, description, icon,
      } = achievement;
      addToast({
        id, name, description, icon,
      });
    });
  }
};

export default reactToKanaChoice;
