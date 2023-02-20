import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../modules/firebase'
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai"
import throwAlert from '../modules/alerts';
// components

const LogOut = ({ userEmail, setLoggedIn, setWordList }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false)
        navigate("/");
      })
      .catch((error) => {
        throwAlert(error.message)
      });
  }

  return (
    <div className='log-out wrapper'>
      <p>Signed In as {userEmail}</p>
      <button onClick={handleClick} title="Log Out" aria-label="Log Out"><AiOutlineLogout aria-hidden="true" /></button>
    </div>
  )
}

export default LogOut;