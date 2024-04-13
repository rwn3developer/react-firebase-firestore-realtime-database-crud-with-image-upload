// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDUZ_9vavja-vDHi2Z7JT8rFvCrQMqLBM8",
  authDomain: "crud-realtime-database-ca639.firebaseapp.com",
  databaseURL: "https://crud-realtime-database-ca639-default-rtdb.firebaseio.com",
  projectId: "crud-realtime-database-ca639",
  storageBucket: "crud-realtime-database-ca639.appspot.com",
  messagingSenderId: "197422924295",
  appId: "1:197422924295:web:da39b1cfa525b2047460a2",
  measurementId: "G-78HT3B98X6",
  databaseURL : "https://crud-realtime-database-ca639-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
