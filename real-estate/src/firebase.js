// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-cc2a4.firebaseapp.com",
  projectId: "real-estate-cc2a4",
  storageBucket: "real-estate-cc2a4.appspot.com",
  messagingSenderId: "456935627437",
  appId: "1:456935627437:web:6f94c29c77ecc2ae13c424"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);