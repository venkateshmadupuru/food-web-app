// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu3HrLEayar8I8Wysyff7PR6Lw_0h_U1E",
  authDomain: "food-app-c1fce.firebaseapp.com",
  projectId: "food-app-c1fce",
  storageBucket: "food-app-c1fce.firebasestorage.app",
  messagingSenderId: "159164852368",
  appId: "1:159164852368:web:95dcc06a088d0c92a3d015",
  measurementId: "G-RX0DSSCZLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();