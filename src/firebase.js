// firebase.js
// placeholder configuration; create your own Firebase project and
// fill in the values below.  Install `firebase` via `npm install firebase`.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// use create‑react‑app environment variables; they must be prefixed with REACT_APP_
// create a .env file in the project root with the following keys:
//   REACT_APP_FIREBASE_API_KEY=...
//   REACT_APP_FIREBASE_AUTH_DOMAIN=...
//   REACT_APP_FIREBASE_PROJECT_ID=...
//   REACT_APP_FIREBASE_STORAGE_BUCKET=...
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
//   REACT_APP_FIREBASE_APP_ID=...
// the build will substitute them at compile time; none of these values will
// be committed to git if you ignore your .env files.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// initialize only once
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
