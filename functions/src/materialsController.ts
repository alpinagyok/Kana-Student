import { Response, Request } from 'express';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { db } from './config/firebase';

interface Kana {
  japName: string;
  romName: string;
}

type MaterialName = 'hiragana' | 'katakana'

interface MaterialBlock {
  id: string;
  name: MaterialName;
  japName: string;
  kanas: {
    row: Kana[]
  }[];
}

const getAllMaterials = async (req: Request, res: Response): Promise<Response> => {
  try {
    const allMaterials: MaterialBlock[] = [];
    const querySnapshot = await db.collection('materials').get();
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      allMaterials.push(doc.data() as MaterialBlock);
    });
    return res.status(200).json(allMaterials);
  } catch (error) { return res.status(500).json(error.message); }
};

export default getAllMaterials;
