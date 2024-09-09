import { React, useContext, useState } from "react";
import { GrGoogle } from "react-icons/gr";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // To navigate after login
import { auth } from '../utilities/firebase';
import { base } from '../utilities/airtable';
import { UserContext } from '../utilities/context';

function Login() {
  const { setUserData } = useContext(UserContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const GoogleLogin = async () => {
    setLoading(true); // Start loading when login starts
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User logged in:", user);

      // Check if user exists in Airtable
      const records = await base('Nutritionists').select({
        filterByFormula: `{Google uid} = "${user.uid}"`
      }).firstPage();

      if (records.length > 0) {
        console.log("User exists in Airtable:", records[0].getId());
        setUserData(records[0]);
      } else {
        // If the user does not exist, create a new record
        const newRecord = base('Nutritionists').create({
          "Google uid": user.uid,
          "First Name": user.displayName.split(' ')[0],
          "Last Name": user.displayName.split(' ')[1] || ' ',
          "Email": user.email,
          "Profile Picture": [
            {
              "url": user.photoURL
            }
          ]
        });
        console.log("New user created in Airtable:", newRecord.getId());
        setUserData(newRecord);
      }
      setLoading(false); // Stop loading after operations are done
      navigate('/dashboard');
    } catch (error) {
      console.log(`Error: ${error}`);
      setLoading(false); // Stop loading if there's an error
    }
  }

  return (
    <>
      <div className="container">
        <h3>Join us today!</h3>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Sign in with one of the options below:</h5>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <button type="button" className="btn" onClick={GoogleLogin}>
                  <GrGoogle /> Sign in with Google
                </button>
              </>
            )}


          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
