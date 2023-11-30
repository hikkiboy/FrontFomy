// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebase from 'firebase/compat/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUMWIctMwmBBp_Hl2MzXK2wpJckCkZeT8",
  authDomain: "fomy-5ea9c.firebaseapp.com",
  projectId: "fomy-5ea9c",
  storageBucket: "fomy-5ea9c.appspot.com",
  messagingSenderId: "27576730639",
  appId: "1:27576730639:web:d8e04715ded327539c0f7a"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const app_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const app_DB = getFirestore(app);
export const app_BKT = getStorage(app);


export {firebase}

