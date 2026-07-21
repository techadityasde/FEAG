// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgWkKylJWOnxom13BpwjHVAV1G4-KjA4c",
  authDomain: "feag-5fa18.firebaseapp.com",
  projectId: "feag-5fa18",
  storageBucket: "feag-5fa18.firebasestorage.app",
  messagingSenderId: "884037695638",
  appId: "1:884037695638:web:f2cd8e900b649143c8aab7",
  measurementId: "G-0S58HT0909"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
