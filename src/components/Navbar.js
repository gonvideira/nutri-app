import React from 'react';

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/nutri-app" className="brand-logo">Nutri App</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/#/auth/login">Join now</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
