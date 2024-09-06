import { React, useContext } from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utilities/context';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

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
    <>
      <h3>Dashboard</h3>
      {userData ? (
        <div className="container">
          <p><strong>Record ID:</strong> {userData.id}</p>
          <p><strong>Name:</strong> {userData.fields?.Name}</p>
          <p><strong>Email:</strong> {userData.fields?.Email}</p>
          <p><strong>License:</strong> {userData.fields?.License}</p>
          {/* Add more fields based on your Airtable data */}
          <div className="section">
            <div className="row">
              <button className="waves-effect waves-light btn" onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  );
};

export default Dashboard;
