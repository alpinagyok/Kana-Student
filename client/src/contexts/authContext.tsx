import React, {
  useContext, useState, useEffect, createContext,
} from 'react';
import firebase from 'firebase/app';
import auth from '../firebase';

const AuthContext = createContext<firebase.User | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      console.log(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
