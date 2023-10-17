import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD7dFmTwpDWhe9hVvZGZqnuTSCcW1SSRr8",
  authDomain: "cricspin-mobile.firebaseapp.com",
  projectId: "cricspin-mobile",
  storageBucket: "cricspin-mobile.appspot.com",
  messagingSenderId: "1035891794049",
  appId: "1:1035891794049:web:59fabac9e34377786fad80",
  measurementId: "G-EXSBDC834M"
};

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app);
