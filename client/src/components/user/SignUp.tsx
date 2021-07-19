import React, { useState } from 'react';
import { AuthResponse, signIn, signUp } from '../../api/auth';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../store/interfaces';
import { ModalType } from '../Header';

interface Props {
  setOpenedModal: React.Dispatch<React.SetStateAction<ModalType>>
}

const SignUp: React.FC<Props> = ({ setOpenedModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [resStatus, setResStatus] = useState<AuthResponse>({ type: IDLE, message: '' });

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setResStatus({ type: LOADING, message: 'Signing up' });
      const res = await signUp(email, password, firstName, lastName);
      setResStatus(res);
      if (res.type === SUCCEEDED) {
        setResStatus({ type: LOADING, message: 'Sing up successful. Signing in...' });
        const loginRes = await signIn(email, password);
        setResStatus(loginRes);
        if (loginRes.type === SUCCEEDED) setOpenedModal(undefined);
      }
    }}
    >
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
      <input
        type="text"
        value={firstName}
        placeholder="firstName"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="lastName"
        onChange={(e) => setLastName(e.target.value)}
      />
      <button
        type="submit"
      >
        SignUp
      </button>
    </form>
  );
};

export default SignUp;
