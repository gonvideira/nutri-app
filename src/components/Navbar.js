import React from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container">
          <a href="/nutri-app" className="brand-logo">Nutri App</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Link 1</a></li>
            <li><a href="/">Link 2</a></li>
            {!user && (
              <li><button className="waves-effect waves-teal btn-flat white-text avatar-link" onClick={handleLoginClick}>Join now</button></li>
            )}
            {user && (
              <li>
                <a href='/#/dashboard' className='avatar-link'>
                  <img src={user.photoURL} alt="avatar" referrerPolicy='no-referrer' className='circle responsive-img avatar-img' />
                </a>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
