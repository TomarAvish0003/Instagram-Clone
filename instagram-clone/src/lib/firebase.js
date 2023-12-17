import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import App from '../App';
//seed will be imported here.

//import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDt1lrppYgR9fm06XN6w0lZ1bXxepyqwO0",
  authDomain: "instagram-clone-91846.firebaseapp.com",
  projectId: "instagram-clone-91846",
  storageBucket: "instagram-clone-91846.appspot.com",
  messagingSenderId: "1046458271719",
  appId: "1:1046458271719:web:5bb99b8e98eb962531df42"
};

const firebase = initializeApp(config);
const {FieldValue} = getFirestore(App);
export const loginRequest = (emailAddress, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, emailAddress, password);
};

//seed file will be called here only Once.

//seedDatabase(firebase);

export {firebase, FieldValue};