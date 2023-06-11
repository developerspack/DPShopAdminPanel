import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: "dpshop254.firebaseapp.com",
  projectId: "dpshop254",
  storageBucket: "dpshop254.appspot.com",
  messagingSenderId: "523584951145",
  appId: "1:523584951145:web:07492394e59c0f0e59a3f8",
  measurementId: "G-GL4HC845XH",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
export const auth = getAuth(app);
const storage = getStorage();

export { app, db, storage };
