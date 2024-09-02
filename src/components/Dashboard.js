import React from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) return <h5>Loading...</h5>;
  if (!user) {
    navigate("/login"); // Redirect if no user
    return null; // Prevent rendering anything else
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to home after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="container">
      <h3>Hi there!</h3>
      <h5>{user.displayName}</h5>
      <div className="section">
        <div className="row">
          <button className="waves-effect waves-light btn" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
