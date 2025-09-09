import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2WFqUoCqvJA3gU8wr7D1jbQBtJzYKbrk",
  authDomain: "catatan-pribadi-4e294.firebaseapp.com",
  projectId: "catatan-pribadi-4e294",
  // storageBucket: "catatan-pribadi-4e294.firebasestorage.app",
  storageBucket: "catatan-pribadi-4e294.appspot.com",
  messagingSenderId: "383956212715",
  appId: "1:383956212715:web:11575f4f9d79bb248ad7ae",
  measurementId: "G-GYC0W9BJ9G"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
