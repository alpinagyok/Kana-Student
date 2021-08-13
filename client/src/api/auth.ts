import axios from 'axios';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import { FAILED, SUCCEEDED } from '../store/interfaces';
import API_ENDPOINT from './constants';
import { IResponse } from './interfaces';

export const signIn = async (email: string, password: string): Promise<IResponse> => {
  try {
    await auth.signInWithEmailAndPassword(
      email, password,
    );
    return { type: SUCCEEDED, message: '' };
  } catch (error) {
    return { type: FAILED, message: error.message };
  }
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
): Promise<IResponse> => {
  try {
    await axios.post<firebase.User>(`${API_ENDPOINT}/users/create`, new URLSearchParams({
      email,
      password,
      displayName,
    }));
    return { type: SUCCEEDED, message: '' };
  } catch (err) {
    return { type: FAILED, message: err?.response?.data?.message ?? 'Internal error' };
  }
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
