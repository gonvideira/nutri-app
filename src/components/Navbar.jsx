import React from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Link } from 'react-router-dom';

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
          <Link to="/" className="brand-logo">Nutri App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!user && (
              <li><button className="waves-effect waves-teal btn-flat white-text" onClick={handleLoginClick}>Join now</button></li>
            )}
            {user && (
              <li>
                <Link to="/dashboard">
                  <img src={user.photoURL} alt="avatar" referrerPolicy='no-referrer' className='circle responsive-img avatar-img' />
                </Link>
              </li>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
