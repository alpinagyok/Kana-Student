import React, { useState } from 'react';
import { AuthResponse, signIn } from '../../api/auth';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../store/interfaces';
import { ModalType } from '../Header';

interface Props {
  setOpenedModal: React.Dispatch<React.SetStateAction<ModalType>>
}

const Login: React.FC<Props> = ({ setOpenedModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resStatus, setResStatus] = useState<AuthResponse>({ type: IDLE, message: '' });

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      setResStatus({ type: LOADING, message: 'Signing in...' });
      const res = await signIn(email, password);
      setResStatus(res);
      if (res.type === SUCCEEDED) setOpenedModal(undefined);
    }}
    >
      {resStatus.type === FAILED && (<h1>{resStatus.message}</h1>)}
      {resStatus.type === LOADING && (<h1>loading</h1>)}
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
      <button
        type="submit"
      >
        login
      </button>
    </form>
  );
};

export default Login;
