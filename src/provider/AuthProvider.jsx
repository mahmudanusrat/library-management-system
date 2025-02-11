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

export const AuthContext = createContext(null);

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
     
        if (currentUser?.email) {
          setUser(currentUser);
          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: currentUser?.email,
            },
            { withCredentials: true }
          );
        } else {
          setUser(currentUser);
          await axios(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });
        }
        setLoading(false);
      });
      return () => {
        return unsubscribe();
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
