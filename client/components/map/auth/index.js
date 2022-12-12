import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
