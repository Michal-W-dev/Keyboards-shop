import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: process.env.NEXT_PUBLIC_DB_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_DB_DOMAIN}.firebaseapp.com`,
  databaseURL: process.env.NEXT_PUBLIC_DB_URL,
  projectId: process.env.NEXT_PUBLIC_DB_DOMAIN,
  storageBucket: `${process.env.NEXT_PUBLIC_DB_DOMAIN}.appspot.com`,
  messagingSenderId: "321087872329",
  appId: "1:321087872329:web:2e1ab144429e0d00d90e98",
  measurementId: "G-CE53HJWM1E"
})
