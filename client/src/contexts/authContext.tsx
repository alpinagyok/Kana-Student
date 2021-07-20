import React, {
  useContext, useState, useEffect, createContext,
} from 'react';
import firebase from 'firebase/app';
import auth from '../firebase';

const AuthContext = createContext<firebase.User | null>(null);

export const useAuth = (): firebase.User | null => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  // There's a bit of delay on reload with onAuthStateChanged
  // To remove this store user in localStorage
  const localUser = localStorage.getItem('firebaseUser');
  const [user, setUser] = useState<firebase.User | null>(
    localUser !== null ? JSON.parse(localUser) : null,
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => {
        localStorage.setItem('firebaseUser', JSON.stringify(firebaseUser));
        setUser(firebaseUser);
      },
      () => {
        localStorage.removeItem('firebaseUser');
        setUser(null);
      },
    );
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
