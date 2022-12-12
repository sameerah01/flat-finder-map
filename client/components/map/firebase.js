import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app'
import "firebase/auth";
console.log('initializeApp', initializeApp);
console.log('firebase', firebase);

const firebaseConfig = {
  apiKey: "AIzaSyAsSJfU0iZuMzyMcf5y-FXFCkzHjaid-yI",
  authDomain: "location-db-1464e.firebaseapp.com",
  projectId: "location-db-1464e",
  storageBucket: "location-db-1464e.appspot.com",
  messagingSenderId: "1066999897508",
  appId: "1:1066999897508:web:9731b83def08d158b53531",
  measurementId: "G-5TV9ZJSGH5"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export {auth, firebase}
