import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  // initializeAuth,
  // getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoPopFYt97dt6UQttTQayPCvQaA8l-I9Q",
  authDomain: "oldproject-20b10.firebaseapp.com",
  projectId: "oldproject-20b10",
  storageBucket: "oldproject-20b10.appspot.com",
  messagingSenderId: "933869398038",
  appId: "1:933869398038:web:36594eebdafcbf9cf1ed37",
};


const app = initializeApp(firebaseConfig);

// Auth, Firestore, Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/* 


  import NetInfo from '@react-native-community/netinfo'
  import firebase from 'firebase/compat/app'
  import 'firebase/compat/auth'
  import 'firebase/compat/firestore'
  import 'firebase/compat/storage'
  import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

  firebase.initializeApp(firebaseConfig)

  export const app = initializeApp(firebaseConfig);

  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

  export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
*/
