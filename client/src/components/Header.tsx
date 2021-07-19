import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { signOut } from '../api/auth';
import { useAuth } from '../contexts/authContext';
import Login from './user/Login';
import SignUp from './user/SignUp';

const LOGIN = 'login' as const;
const SIGNUP = 'signup' as const;
export type ModalType = typeof LOGIN | typeof SIGNUP | undefined

const Header: React.FC = () => {
  const user = useAuth();
  const [openedModal, setOpenedModal] = useState<ModalType>();

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
      <Modal
        isOpen={openedModal !== undefined}
        contentLabel="Auth modal"
      >
        <button type="button" onClick={() => setOpenedModal(undefined)}>close</button>
        {openedModal === LOGIN ? (
          <Login setOpenedModal={setOpenedModal} />
        ) : (
          <SignUp setOpenedModal={setOpenedModal} />
        )}
      </Modal>
    </div>
  );
};
export default Header;
