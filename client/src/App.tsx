import './App.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <div>
      <h1>Hello!</h1>
      <Link to="/test">Test</Link>
    </div>
  );
}

export default App;
