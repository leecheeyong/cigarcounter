import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "cigarcounter-f927f.firebaseapp.com",
  projectId: "cigarcounter-f927f",
  storageBucket: "cigarcounter-f927f.firebasestorage.app",
  messagingSenderId: "887400669927",
  appId: "1:887400669927:web:dfb9d3a7fc80ccb05e3842"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
