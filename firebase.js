// firebase.js

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw4S-zXiO77FVmMi5Bud6jyTNcG6onqAs",
  authDomain: "investconnect-7c49a.firebaseapp.com",
  projectId: "investconnect-7c49a",
  storageBucket: "investconnect-7c49a.appspot.com",
  messagingSenderId: "859441662635",
  appId: "1:859441662635:web:3988850738894620db05ee",
  measurementId: "G-Z5F1B4JRNK",
};

// Firebase app'i başlat
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, firebaseApp};
export const FIREBASE_DB = getFirestore(firebaseApp);

/*
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
*/