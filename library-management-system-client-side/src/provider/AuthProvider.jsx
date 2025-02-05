import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ routes }) => {
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    // .then(res=> signOut(auth))
  };
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const manageProfile = (name, image) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };
  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      try {
        setUser(currentUser);

        if (currentUser?.email) {
          const user = { email: currentUser.email };
          const res = await axios.post("https://library-management-system-server-side-phi.vercel.app/jwt", user, {
            withCredentials: true,
          });
          console.log("JWT Response:", res.data);
        } else {
          const res = await axios.post("https://library-management-system-server-side-phi.vercel.app/logout", {}, {
            withCredentials: true,
          });
          console.log("Logout Response:", res.data);
        }
      } catch (error) {
        console.error("Auth State Change Error:", error);
      } finally {
        setLoading(false);
      }
    });

     
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    manageProfile,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{routes}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
