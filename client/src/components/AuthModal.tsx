import React, { FormEvent, useState } from 'react';
import { signIn, signUp } from '../api/auth';
import { IResponse } from '../api/interfaces';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../store/interfaces';
import Error from './common/Error';
import Loading from './common/Loading';
import { AuthModalType, LOGIN, SIGNUP } from './Header';
import {
  ModalButton,
  ModalButtons, ModalFields, ModalPaper, ModalTextField, StyledModal,
} from './styles';

interface Props {
  openedModal: AuthModalType;
  setOpenedModal: React.Dispatch<React.SetStateAction<AuthModalType>>
}

const AuthModal: React.FC<Props> = ({ openedModal, setOpenedModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [resStatus, setResStatus] = useState<IResponse>({ type: IDLE, message: '' });

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

  return (
    <StyledModal
      open={openedModal !== undefined}
      onClose={closeModal}
      closeAfterTransition
    >
      <ModalPaper>
        <form onSubmit={handleAuth}>
          {resStatus.type === FAILED && (<Error message={resStatus.message} />)}
          {resStatus.type === LOADING && (<Loading message={resStatus.message} />)}
          <ModalFields>
            <ModalTextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
            <ModalTextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" />
            {openedModal === SIGNUP && (
            <ModalTextField value={displayName} onChange={(e) => setDisplayName(e.target.value)} label="Display Name" />
            )}
          </ModalFields>
          <ModalButtons>
            <ModalButton type="submit" color="primary" variant="outlined">
              {openedModal}
            </ModalButton>
            <ModalButton color="secondary" variant="outlined" onClick={closeModal}>
              Close
            </ModalButton>
          </ModalButtons>
        </form>
      </ModalPaper>
    </StyledModal>
  );
};
export default AuthModal;
