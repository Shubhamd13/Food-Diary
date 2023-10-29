// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrJiV8C_xC6qLpGAR4j60CshmdXZ5okbM",
  authDomain: "food-diary-9ddf1.firebaseapp.com",
  projectId: "food-diary-9ddf1",
  storageBucket: "food-diary-9ddf1.appspot.com",
  messagingSenderId: "16165677282",
  appId: "1:16165677282:web:e84bd2273675c8b15c96bb",
  measurementId: "G-VJJRPNSQ2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db };
export default app;
