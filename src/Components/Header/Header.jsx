import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div style={{ color: 'white' }}>
      <Link to='/'>Sorting</Link>
      <Link to='/pathfinding'>Pathfinding</Link>
    </div>
  );
}

export default Header;
