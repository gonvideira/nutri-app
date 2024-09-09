import { React, useContext } from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from '../utilities/context';
import { useNavigate, Link } from 'react-router-dom';
import useSignOut from '../utilities/handleSignOut';

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { userData } = useContext(UserContext);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className='navbar bg-primary'>

      <div className="container-fluid">

        <Link to="/" className="nav-link">Nutri App</Link>

        {(!user || !userData) && (
          <button className="btn btn-light text-dark me-2" onClick={handleLoginClick}>Join now</button>
        )}

        {user && userData && (

          <>
            <button className="waves-effect waves-light btn" onClick={signOut}>
              Sign out
            </button>
            <Link to="/dashboard" className='d-block link-body-emphasis text-decoration-none'>
              <img src={user.photoURL} alt="avatar" referrerPolicy='no-referrer' className='rounded-circle' width="32" height="32" />
            </Link>

          </>


        )}


      </div>

    </header >
  );
}

export default Navbar;
