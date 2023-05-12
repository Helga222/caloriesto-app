// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSt44LX0uP3qo1KKxKDGqYVrNavNGOPoQ",
  authDomain: "caloriesto-app.firebaseapp.com",
  projectId: "caloriesto-app",
  storageBucket: "caloriesto-app.appspot.com",
  messagingSenderId: "891838958543",
  appId: "1:891838958543:web:365ad5a61457c489d420ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
