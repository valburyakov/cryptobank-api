import React from 'react';
import { NavIcon } from './nav-icon';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faUsd, faUsers } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="relative flex-shrink-0 h-16 w-full bg-white shadow">
      <ul className="flex items-center">
        <li className="nav-item">
          <NavIcon name="bitcon" icon={faBitcoin} />
        </li>
        <li className="nav-item">
          <NavIcon name="USD" icon={faUsd} />
        </li>
        <li className="nav-item">
          <NavIcon name="User" icon={faUsers} />
        </li>
      </ul>
    </header>
  );
}

export default Header;
