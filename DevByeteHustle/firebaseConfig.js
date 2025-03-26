import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
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

// Enable auth persistence using AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore instance
export const db = getFirestore(app);
