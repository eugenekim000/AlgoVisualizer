import React from 'react';
import { Link } from 'react-router-dom';

function Header({ running }) {
  return (
    <div style={{ color: 'white' }}>
      <Link to='/'>
        <button disabled={running}>Sorting</button>
      </Link>
      <Link to='/pathfinding'>
        <button disabled={running}>Pathfinding</button>
      </Link>
    </div>
  );
}

export default Header;
