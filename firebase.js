import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcwg_eoTLjP7DDb3fgPkgtwxsLk-ctmAY",
  authDomain: "limkokwing-prospectus.firebaseapp.com",
  projectId: "limkokwing-prospectus",
  storageBucket: "limkokwing-prospectus.firebasestorage.app",
  messagingSenderId: "653145344799",
  appId: "1:653145344799:web:5c7518756eaae3c36ebe2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
