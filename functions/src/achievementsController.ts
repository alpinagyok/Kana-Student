import { Response } from 'express';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from './config/firebase';
import { RequestCustom } from './usersController';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const getAllAchievements = async (req: undefined, res: Response): Promise<Response> => {
  try {
    const allAchievements: Achievement[] = [];
    const querySnapshot = await db.collection('achievements').get();
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      allAchievements.push(doc.data() as Achievement);
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
