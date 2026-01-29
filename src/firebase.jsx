import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzTc_yL9UEP4TZKF_rch_7NAQMAVHLPGs",
  authDomain: "taskflow-126d7.firebaseapp.com",
  projectId: "taskflow-126d7",
  storageBucket: "taskflow-126d7.firebasestorage.app",
  messagingSenderId: "758728484118",
  appId: "1:758728484118:web:50e756c87af3aa6383dc37",
  measurementId: "G-5B9HTSBXTB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)