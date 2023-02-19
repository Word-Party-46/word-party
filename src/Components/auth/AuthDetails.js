import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../../modules/firebase'
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai"
import throwAlert from '../../modules/alerts';
// components

const AuthDetails = ({ setWordList }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    });
    return () => {
      setWordList([]);
      listen();
    }
  }, [setWordList])

  const navigate = useNavigate();

  const handleClick = () => {
    console.log('clicked')
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throwAlert(error.message)
      });
  }

  return (
    <div>
      {authUser
        ? <>
          <p>Signed In as {authUser.email}</p>
          <button onClick={handleClick}><AiOutlineLogout /></button>
        </>
        : <p>Signed Out</p>
      }
    </div>
  )
}

export default AuthDetails