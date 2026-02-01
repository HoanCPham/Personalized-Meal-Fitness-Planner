// client/src/lib/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Persist auth across tabs/refreshes
setPersistence(auth, browserLocalPersistence).catch(console.warn);

// Provider (optionally request profile/email)
const provider = new GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

// Robust Google login: popup first, fallback to redirect
export async function loginWithGoogle() {
  try {
    return await signInWithPopup(auth, provider);
  } catch (err) {
    // Common popup issues: blocked or cancelled
    if (
      err?.code === "auth/popup-blocked" ||
      err?.code === "auth/cancelled-popup-request" ||
      err?.code === "auth/popup-closed-by-user"
    ) {
      await signInWithRedirect(auth, provider);
      // When redirected back, this resolves with the user credential (ignore errors silently)
      return getRedirectResult(auth).catch(() => null);
    }
    // Surface other errors to the caller
    throw err;
  }
}

export const logout = () => signOut(auth);

// Auth state subscription
export const onUserChange = (callback) => onAuthStateChanged(auth, callback);
