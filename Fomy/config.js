import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBUMWIctMwmBBp_Hl2MzXK2wpJckCkZeT8",
    authDomain: "fomy-5ea9c.firebaseapp.com",
    projectId: "fomy-5ea9c",
    storageBucket: "fomy-5ea9c.appspot.com",
    messagingSenderId: "27576730639",
    appId: "1:27576730639:web:d8e04715ded327539c0f7a"
  }

  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);
  export const app_auth = getAuth(app);
  export const app_DB = getFirestore(app);

  export { firebase };