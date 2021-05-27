export interface Kana {
  id: string;
  japName: string;
  romName: string;
}

export type MaterialName = 'Hiragana' | 'Katakana'

export type MaterialBlock = {
  id: string;
  name: MaterialName;
  japName: string;
  kanas: Kana[][];
}

export const GUESSER_LESSON = 'guesser' as const;
export const WRITER_LESSON = 'writer' as const;
export const EXAM_LESSON = 'exam' as const;

export type LessonType = typeof GUESSER_LESSON | typeof WRITER_LESSON | typeof EXAM_LESSON;

export const IDLE = 'idle' as const;
export const LOADING = 'loading' as const;
export const SUCCEEDED = 'succeeded' as const;
export const FAILED = 'failed' as const;

export type FetchStatus = typeof IDLE | typeof LOADING | typeof SUCCEEDED | typeof FAILED;
