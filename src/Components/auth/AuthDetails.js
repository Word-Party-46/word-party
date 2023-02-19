import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../../modules/firebase'
import { Route, Routes } from "react-router-dom";
// components
import Home from "../Home";
import SavedWords from "../SavedWords";
import NotFound from "../NotFound";
import Header from "../Header";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [WordAddClassName, setWordAddClassName] = useState('');

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    });

    return () => {
      listen();
    }
  }, [])

  const handleClick = () => {
    console.log('clicked')
    signOut(auth)
      .then(() => {
        console.log('Sign Out successful')
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

  return (
    <div>
      {authUser
        ? <>
          <p>Signed In as {authUser.email}</p>
          <button onClick={handleClick}>Sign Out</button>
        </>
        : <p>Signed Out</p>
      }
    </div>
  )
}

export default AuthDetails