// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "food-app-c1fce.firebaseapp.com",
  projectId: "food-app-c1fce",
  storageBucket: "food-app-c1fce.firebasestorage.app",
  messagingSenderId: "159164852368",
  appId: "1:159164852368:web:95dcc06a088d0c92a3d015",
  measurementId: "G-RX0DSSCZLJ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();