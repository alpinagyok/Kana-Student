import { Response } from 'express'
import { db } from './config/firebase'

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

type Request = {
  body: MaterialBlock,
}

const getAllMaterials = async (req: Request, res: Response) => {
  try {
    const allMaterials: MaterialBlock[] = []
    const querySnapshot = await db.collection('materials').get()
    querySnapshot.forEach((doc: any) => allMaterials.push(doc.data()))
    return res.status(200).json(allMaterials)
  } catch(error) { return res.status(500).json(error.message) }
}

export { getAllMaterials }
