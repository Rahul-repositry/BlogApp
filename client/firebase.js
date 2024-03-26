// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-c4c3f.firebaseapp.com",
  projectId: "mern-blog-c4c3f",
  storageBucket: "mern-blog-c4c3f.appspot.com",
  messagingSenderId: "680931484820",
  appId: "1:680931484820:web:1e6c51930eb17e23c70081",
  measurementId: "G-0WXMN8LHZ0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
