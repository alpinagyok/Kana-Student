import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AuthResponse, signIn, signUp } from '../api/auth';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../store/interfaces';
import { AuthModalType, LOGIN, SIGNUP } from './Header';

interface Props {
  openedModal: AuthModalType;
  setOpenedModal: React.Dispatch<React.SetStateAction<AuthModalType>>
}

const AuthModal: React.FC<Props> = ({ openedModal, setOpenedModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [resStatus, setResStatus] = useState<AuthResponse>({ type: IDLE, message: '' });

  const closeModal = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setResStatus({ type: IDLE, message: '' });
    setOpenedModal(undefined);
  };

  const handleLogin = async () => {
    setResStatus({ type: LOADING, message: 'Signing in...' });
    const res = await signIn(email, password);
    setResStatus(res);
    if (res.type === SUCCEEDED) { closeModal(); }
  };

  const handleSignUp = async () => {
    setResStatus({ type: LOADING, message: 'Signing up...' });
    const res = await signUp(email, password, displayName);
    setResStatus(res);
    if (res.type === SUCCEEDED) {
      handleLogin();
    }
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (openedModal === LOGIN) handleLogin();
    else handleSignUp();
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Modal
      isOpen={openedModal !== undefined}
      contentLabel="Auth modal"
    >
      <button type="button" onClick={closeModal}>close</button>
      <form onSubmit={handleAuth}>
        {resStatus.type === FAILED && (<h1>{resStatus.message}</h1>)}
        {resStatus.type === LOADING && (
          <h1>
            loading:
            {' '}
            {resStatus.message}
          </h1>
        )}
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {openedModal === SIGNUP && (
          <input
            type="text"
            value={displayName}
            placeholder="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}
        <button
          type="submit"
        >
          {openedModal}
        </button>
      </form>
    </Modal>
  );
};
export default AuthModal;