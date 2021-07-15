import { auth } from '../firebase';

export const signIn = async (email: string, password: string): Promise<string> => {
  try {
    await auth.signInWithEmailAndPassword(
      email, password,
    );
    return '';
  } catch (error) {
    return error.code;
  }
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
