import { Response } from 'express';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from './config/firebase';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const getAllAchievements = async (req: undefined, res: Response): Promise<Response> => {
  try {
    const allAchievements: Achievement[] = [];
    const querySnapshot = await db.collection('achievements').get();
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      allAchievements.push(doc.data() as Achievement);
    });
    return res.status(200).json(allAchievements);
  } catch (error) { return res.status(500).json(error.message); }
};

export default getAllAchievements;
