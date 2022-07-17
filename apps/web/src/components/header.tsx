import React from 'react';
import { NavIcon } from './nav-icon';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faUsd, faUsers } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className="container mx-auto">
      <header className="sticky top-0 p-4 w-full">
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
    </div>
  );
}

export default Header;
