import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div style={{ color: 'white' }}>
      <Link to='/'>
        <button>Sorting</button>
      </Link>
      <Link to='/pathfinding'>
        <button>Pathfinding</button>
      </Link>
    </div>
  );
}

export default Header;
