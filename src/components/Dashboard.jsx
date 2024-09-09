import { React, useContext, useEffect } from 'react';
import { auth } from '../utilities/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utilities/context';
import useSignOut from '../utilities/handleSignOut';
import ClientsList from './ClientsList';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const signOut = useSignOut();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <h5>Loading...</h5>;

  return (
    <>
      <h3>Dashboard</h3>
      {!userData ? (
        <>
          <p>Loading user data...</p>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{userData.fields?.Name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Record ID: {userData.id}</h6>
              <p className="card-text"><strong>Email:</strong> {userData.fields?.Email}</p>
              <p className="card-text"><strong>License:</strong> {userData.fields?.License}</p>
              {/* Add more fields based on your Airtable data */}
              <button className="btn btn-primary" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
          <ClientsList recordId={userData.id} />
        </>
      )}
    </>
  );
};

export default Dashboard;
