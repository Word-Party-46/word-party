// modules
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBugIf6J5ajB6PwwWHjEw9slK7RENSu3nU",
  authDomain: "beta-wordparty.firebaseapp.com",
  projectId: "beta-wordparty",
  storageBucket: "beta-wordparty.appspot.com",
  messagingSenderId: "629801017659",
  appId: "1:629801017659:web:d4a7f307953ebe668c971e"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)
export default firebase;