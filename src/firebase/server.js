// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  // vraie BDD
  apiKey: "AIzaSyCUdlxy1aznOB66jibvaZAdma7BK28lRW8",
  authDomain: "projet-final-5ee16.firebaseapp.com",
  projectId: "projet-final-5ee16",
  storageBucket: "projet-final-5ee16.appspot.com",
  messagingSenderId: "265741752262",
  appId: "1:265741752262:web:aa84ee5ca70c2c1201c4c7"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // Fournisseur Google
export {db};