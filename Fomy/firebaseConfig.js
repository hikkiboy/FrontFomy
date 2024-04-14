// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebase from 'firebase/compat/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
//api key goes here

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const app_auth = getAuth(app);
export const app_DB = getFirestore(app);
export const app_BKT = getStorage(app);

//IOS: 27576730639-s5jlear7di4c8pmld8sqe3fqeo5qg601.apps.googleusercontent.com
//ANDROID: 27576730639-f5up9pq9f3fcvbn2lltms4sura2sn8uv.apps.googleusercontent.com
