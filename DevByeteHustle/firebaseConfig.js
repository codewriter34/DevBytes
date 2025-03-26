// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKT-orCicnWYLx3Ug7-VaKxQj18LDNzMk",
  authDomain: "devbyteshustle.firebaseapp.com",
  projectId: "devbyteshustle",
  storageBucket: "devbyteshustle.appspot.com",
  messagingSenderId: "104787681850",
  appId: "1:104787681850:web:4e97720cccf8d90ec9cb03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
