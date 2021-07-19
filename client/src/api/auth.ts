import axios from 'axios';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import { FAILED, FetchStatus, SUCCEEDED } from '../store/interfaces';
import API_ENDPOINT from './constants';

export type AuthResponse = {
  type: FetchStatus
  message: string;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    await auth.signInWithEmailAndPassword(
      email, password,
    );
    return { type: SUCCEEDED, message: '' };
  } catch (error) {
    return { type: FAILED, message: error.code };
  }
};

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<AuthResponse> => {
  try {
    await axios.post<firebase.User>(`${API_ENDPOINT}/users/create`, new URLSearchParams({
      email,
      password,
      firstName,
      lastName,
    }));
    return { type: SUCCEEDED, message: '' };
  } catch (err) {
    return { type: FAILED, message: err?.response?.data?.code ?? 'internal error' };
  }
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
