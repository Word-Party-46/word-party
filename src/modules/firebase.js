import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCR1-jTMmp5MCPmYgTxkC9M_rneJf0R82Q",
  authDomain: "word-party-7947f.firebaseapp.com",
  databaseURL: "https://word-party-7947f-default-rtdb.firebaseio.com",
  projectId: "word-party-7947f",
  storageBucket: "word-party-7947f.appspot.com",
  messagingSenderId: "703213887524",
  appId: "1:703213887524:web:47005cb362841c90c4f8b1"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase)

export default firebase;