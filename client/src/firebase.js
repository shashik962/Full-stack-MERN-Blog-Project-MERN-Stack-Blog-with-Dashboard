// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const key = process.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f9bf0.firebaseapp.com",
  projectId: "mern-blog-f9bf0",
  storageBucket: "mern-blog-f9bf0.appspot.com",
  messagingSenderId: "483684680996",
  appId: "1:483684680996:web:da23ae5fcc65a9d4f9dfb1",
  measurementId: "G-W6PSH29VNL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);