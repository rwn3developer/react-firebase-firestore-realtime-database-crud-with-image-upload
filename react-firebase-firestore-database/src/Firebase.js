import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCtFOlIVMSVg2LEbTWbUd1N6Ynv6SRfwPQ",
  authDomain: "crud-firestore-database-d91b4.firebaseapp.com",
  projectId: "crud-firestore-database-d91b4",
  storageBucket: "crud-firestore-database-d91b4.appspot.com",
  messagingSenderId: "850377259608",
  appId: "1:850377259608:web:53d0c60d7ff8fac20de82d",
  measurementId: "G-2YTGQ4J44S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
