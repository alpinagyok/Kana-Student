import { body, ValidationChain } from 'express-validator';

const validateAchievements = (method: string): ValidationChain[] => {
  switch (method) {
    case 'checkForAndAddUsersAchievements':
    default: {
      return [
        body('materialId', { code: 'achievements/no-material-id', message: 'Material ID is missing' }).exists(),
        body('lessonType', { code: 'achievements/lesson-type', message: 'Lesson type is missing' }).exists(),
        body('successStreak', { code: 'achievements/success-streak', message: 'Success streak is missing' }).exists(),
        body('totalAnswers', { code: 'achievements/total-answers', message: 'Total answers is missing' }).exists(),
      ];
    }
  }
};

export default validateAchievements;
