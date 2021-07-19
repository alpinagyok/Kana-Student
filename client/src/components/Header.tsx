import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { signOut } from '../api/auth';
import { useAuth } from '../contexts/authContext';
import AuthModal from './AuthModal';

export const LOGIN = 'login' as const;
export const SIGNUP = 'signup' as const;
export type AuthModalType = typeof LOGIN | typeof SIGNUP | undefined

const Header: React.FC = () => {
  const user = useAuth();
  const [openedModal, setOpenedModal] = useState<AuthModalType>();

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <div>
      <Link to="/test">test</Link>
      <Link to="/learn">learn</Link>
      <Link to="/lesson">lesson</Link>
      <Link to="/achievements">achievements</Link>
      {user ? (
        <>
          <p>{user.email}</p>
          <button type="button" onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <button type="button" onClick={() => setOpenedModal(LOGIN)}>login</button>
          <button type="button" onClick={() => setOpenedModal(SIGNUP)}>signup</button>
        </>
      )}
      <AuthModal openedModal={openedModal} setOpenedModal={setOpenedModal} />
    </div>
  );
};
export default Header;
