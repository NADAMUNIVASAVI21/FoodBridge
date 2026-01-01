import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWyQSmjjdVe_Wv5ffPg_s0AlaglQmgP9Q",
  authDomain: "foodbridge-40b4e.firebaseapp.com",
  projectId: "foodbridge-40b4e",
  storageBucket: "foodbridge-40b4e.appspot.com",
  messagingSenderId: "93594604476",
  appId: "1:93594604476:web:c82fa8e9f6e811b37fd1b9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);