import React, {
  useContext, useState, useEffect, createContext,
} from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import auth from '../firebase';
import API_ENDPOINT from '../api/constants';

type Value = {
  user: firebase.User | null;
  userAchievements: string[];
  addUserAchievements: ((newAchievs: string[]) => void) | undefined
};

const AuthContext = createContext<Value>({
  user: null,
  userAchievements: [],
  addUserAchievements: undefined,
});

export const useAuth = (): Value => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  // There's a bit of delay on reload with onAuthStateChanged
  // To remove this store user in localStorage
  const localUser = localStorage.getItem('kanaUser');
  const [user, setUser] = useState<firebase.User | null>(
    localUser !== null ? JSON.parse(localUser) : null,
  );
  const [userAchievements, setUserAchievements] = useState<string[]>(
    JSON.parse(localStorage.getItem('kanaUserAchievements') ?? '[]'),
  );

  const addUserAchievements = (newAchievs: string[]) => {
    const updatedArray = [...userAchievements, ...newAchievs];
    setUserAchievements(updatedArray);
    localStorage.setItem('kanaUserAchievements', JSON.stringify(updatedArray));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser) => {
        if (firebaseUser !== null) {
          // Update user after logging in
          setUser(firebaseUser);
          localStorage.setItem('kanaUser', JSON.stringify(firebaseUser));

          // TODO (maybe): fetch achievements only when localstorage is empty

          // Fetch achievements of currently logged in user
          const token = await firebaseUser.getIdToken();
          // Token will be needed for private api routes
          localStorage.setItem('kanaToken', token);
          const achievRes: string[] = (await axios.get(`${API_ENDPOINT}/achievements/userSpecific`, {
            headers: { authorization: `Bearer ${token}` },
          })).data;

          // After getting achievements, set them
          setUserAchievements(achievRes);
          localStorage.setItem('kanaUserAchievements', JSON.stringify(achievRes));
        } else {
          localStorage.removeItem('kanaUser');
          localStorage.removeItem('kanaToken');
          localStorage.removeItem('kanaUserAchievements');
          setUser(null);
          setUserAchievements([]);
        }
      },
    );
    return unsubscribe;
  }, []);

  const value = {
    user, userAchievements, addUserAchievements,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
