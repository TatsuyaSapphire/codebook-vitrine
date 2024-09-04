// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const express = require('express');
const cors = require('cors');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const app = express();
app.use(cors());

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCUdlxy1aznOB66jibvaZAdma7BK28lRW8",
  authDomain: "projet-final-5ee16.firebaseapp.com",
  projectId: "projet-final-5ee16",
  storageBucket: "projet-final-5ee16.appspot.com",
  messagingSenderId: "265741752262",
  appId: "1:265741752262:web:aa84ee5ca70c2c1201c4c7"

};


// Initialize Firebase

const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);

// Endpoint pour récupérer les produits
app.get('/api/products', async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      res.json({ results: products });
    } catch (error) {
      res.status(500).send('Erreur lors de la récupération des produits');
    }
  });
  
  // Démarrer le serveur
  app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
  });