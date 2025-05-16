import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8WwaR2-PMsBbcMQjKhDnqsA4eh6X0YJM",
  authDomain: "testproject-79c7a.firebaseapp.com",
  projectId: "testproject-79c7a",
  storageBucket: "testproject-79c7a.appspot.com",
  messagingSenderId: "359801760728",
  appId: "1:359801760728:web:7ac67174b207d1517ae0ad",
};

const app = initializeApp(firebaseConfig);

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
