import { Response } from 'express';
import { validationResult } from 'express-validator';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from './config/firebase';
import { RequestCustom } from './usersController';

interface ShortAchievement {
  id: string;
  order: number;
  name: string;
  description: string;
  icon: string;
}

interface Achievement extends ShortAchievement {
  condition: {
    materialId?: string;
    lessonType?: 'writer' | 'guesser';
    successStreak?: number;
    totalAnswers?: number;
  }
}

interface Condition {
  materialId: string;
  lessonType: 'writer' | 'guesser';
  successStreak: number;
  totalAnswers: number;
}

export const checkForAndAddUsersAchievements = async (
  req: RequestCustom<Record<string, never>, Record<string, never>, Condition>,
  res: Response,
): Promise<Response> => {
  try {
    const { body } = req;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()[0].msg);
    }

    const allAchievements: Achievement[] = [];
    const querySnapshot = await db.collection('achievements').get();
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      allAchievements.push(doc.data() as Achievement);
    });

    // Filter current user's achievemnts
    const loggedInUser = db.collection('users').doc(req.authId);
    const gottenAchievementIDs = (await loggedInUser.get()).data()?.achievements ?? [];
    const achievements = allAchievements.filter((achievement) => (
      !gottenAchievementIDs.includes(achievement.id)
    ));

    // Filter the achievements that match the request
    // If smt is undefined in achievement, it doesn't matter
    const newAchievements = achievements.filter(
      (achievement) => {
        const {
          materialId, lessonType, successStreak, totalAnswers,
        } = achievement.condition;

        return (materialId === undefined || body.materialId === materialId)
          && (lessonType === undefined || body.lessonType === lessonType)
          && (successStreak === undefined || body.successStreak >= successStreak)
          && (totalAnswers === undefined || body.totalAnswers >= totalAnswers);
      },
    ).map((achievement) => (({
      id, name, description, icon,
    }) => ({
      id, name, description, icon,
    }))(achievement)); // create shorter achievement object

    // Save new achievements to the user
    await loggedInUser.set({
      achievements: [...gottenAchievementIDs, ...newAchievements.map((ach) => ach.id)],
    });

    return res.status(200).json(newAchievements);
  } catch (error) { return res.status(500).json(error.message); }
};

export const getAllAchievements = async (req: undefined, res: Response): Promise<Response> => {
  try {
    const allAchievements: ShortAchievement[] = [];
    const querySnapshot = await db.collection('achievements').get();
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      const {
        id,
        order,
        name,
        description,
        icon,
      } = (doc.data() as Achievement);

      allAchievements.push({
        id,
        order,
        name,
        description,
        icon,
      });
    });
    return res.status(200).json(allAchievements);
  } catch (error) { return res.status(500).json(error.message); }
};

export const getUsersAchievements = async (
  req: RequestCustom,
  res: Response,
): Promise<Response> => {
  try {
    const loggedInUser = db.collection('users').doc(req.authId);
    const achievements = (await loggedInUser.get()).data()?.achievements ?? [];
    return res.status(200).json(achievements);
  } catch (error) { return res.status(500).json(error.message); }
};
