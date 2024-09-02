import React from "react";
import { GrGoogle } from "react-icons/gr";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom"; // To navigate after login
import { auth } from '../utilities/firebase';
import { base } from '../utilities/airtable';

function Login() {
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

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
        console.log("User exists in Airtable:", records[0].fields);
      } else {
        // If the user does not exist, create a new record
        const newRecord = base('Nutritionists').create({
          'fields': {
            "Google uid": user.uid,
            "First Name": user.displayName,
            "Email": user.email,
            "Profile Picture": [
              {
                "url": user.photoURL
              }
            ]
          }
        });
        console.log("New user created in Airtable:", newRecord.fields);
      }

      // Redirect to the dashboard
      const basePath = location.pathname.startsWith("/nutri-app") ? "/nutri-app" : "";
      navigate(`${basePath}/#/dashboard`);

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <div className="container">
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
    </div>
  );
}

export default Login;
