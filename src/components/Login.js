import React from "react";
import { GrGoogle } from "react-icons/gr";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../utilities/firebase';

function Login() {
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return (
      <div className="container">
        <h2>Join us today!</h2>
        <h3>Sign in with Google</h3>
        <div className="section">
        <button className="waves-effect waves-light btn" onClick={GoogleLogin}>
            <GrGoogle /> Sign in with Google
        </button>
        </div>
      </div>
    );
  }
  
  export default Login;
  