import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <div>
    <Link to="/test">test</Link>
    <Link to="/learn">learn</Link>
    <Link to="/lesson">lesson</Link>
    <Link to="/achievements">achievements</Link>
  </div>
);

export default Header;
