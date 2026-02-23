import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  // sign in with popup, handle common user errors
  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.warn("login error", err);
      // Firebase gives auth/popup-blocked or auth/cancelled-popup-request
      // these typically happen if the user clicks the button multiple times,
      // if the browser blocked popups, or if the project isn't authorized
      // for localhost.  We simply alert and let the user retry.
      alert(
        `Login failed: ${err.message || err.code}\n` +
          `Make sure your browser allows pop‑ups and that localhost is added as an ` +
          `authorized domain in your Firebase console (Authentication → Settings).`,
      );
    }
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
