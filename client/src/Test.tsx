import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOut } from './api/auth';
import { useAuth } from './contexts/authContext';

function Test(): JSX.Element {
  const user = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div>
      <h1>{user?.email}</h1>
      {error !== '' && (<h1>{error}</h1>)}
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
        type="button"
        onClick={async () => {
          const err = await signIn(email, password);
          setError(err);
        }}
      >
        login
      </button>
      <button
        type="button"
        onClick={() => {
          signOut();
        }}
      >
        logout
      </button>
      <h1>TEST!</h1>
      <Link to="/">App</Link>
    </div>
  );
}

export default Test;
