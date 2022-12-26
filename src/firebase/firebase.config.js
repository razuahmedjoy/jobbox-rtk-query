// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrdCzqh6QmIWuEb_Lsp9I9w3D5HBkOpqs",
  authDomain: "jobbox-redux-5ec7d.firebaseapp.com",
  projectId: "jobbox-redux-5ec7d",
  storageBucket: "jobbox-redux-5ec7d.appspot.com",
  messagingSenderId: "162411310873",
  appId: "1:162411310873:web:c3ae58e717dee84a3edf88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);