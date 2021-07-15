import { auth } from '../firebase';

export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await auth.signInWithEmailAndPassword(
      email, password,
    );
  } catch (error) {
    console.error('err', error);
  }
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
