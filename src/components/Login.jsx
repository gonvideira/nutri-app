import {React, useContext} from "react";
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

  const GoogleLogin = async () => {
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
      navigate('/dashboard');
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <>
      <h3>Join us today!</h3>
      <h5>Sign in with one of the options below:</h5>
      <div className="section">
        <div className="row">
          <button className="waves-effect waves-light btn" onClick={GoogleLogin}>
            <GrGoogle /> Sign in with Google
          </button>
        </div>
        <div className="row">
          <button className="waves-effect waves-light btn">
            Sign in with ...
          </button>
        </div>
        <div className="row">
          <button className="waves-effect waves-light btn">
            Sign in with ...
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
