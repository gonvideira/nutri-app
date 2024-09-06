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
    <header className='navbar bg-primary'>

      <div className="container-fluid">

        <Link to="/" className="nav-link">Nutri App</Link>

        {!user && (
          <button className="btn btn-light text-dark me-2" onClick={handleLoginClick}>Join now</button>
        )}

        {user && (
          <div className="flex-shrink-0 dropdown">
            <Link to="/dashboard" className='d-block link-body-emphasis text-decoration-none dropdown-toggle show'>
              <img src={user.photoURL} alt="avatar" referrerPolicy='no-referrer' className='rounded-circle' width="32" height="32" />
            </Link>
            <ul
              className="dropdown-menu text-small shadow"
              data-popper-placement="bottom-end"
              style={{
                position: "absolute",
                inset: "0px 0px auto auto",
                margin: "0px",
                transform: "translate3d(0px, 34.4px, 0px)"
              }}
            >
              <li>
                one
              </li>
              <li>
                one
              </li>
            </ul>
          </div>

        )}


      </div>

    </header>
  );
}

export default Navbar;
