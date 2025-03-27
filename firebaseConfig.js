import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
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

// Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Enable auth persistence only if it's not already initialized
let auth;
if (!getApps().length || !getAuth().app) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app);
}

// Firestore instance
export const db = getFirestore(app);
export { auth };
