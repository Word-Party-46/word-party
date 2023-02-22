// modules
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai"
import { RiLockPasswordLine } from 'react-icons/ri'
// local imports
import { auth } from '../modules/firebase'
import throwAlert from "../modules/alerts";

const SignIn = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          throwAlert('Please double-check your email entry or create a new account');
        } else if (error.code === 'auth/wrong-password') {
          throwAlert('Wrong password. Please try again.')
        } else {
          throwAlert(`${error.message} Please try again.`)
        }
      })
  }

  return (
    <div className="sign-in wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Log in to your account</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password" />
        <button type="submit" onSubmit={handleSubmit} title="Sign In" aria-label="Sign In"><AiOutlineLogin aria-hidden="true" /></button>
      </form>
      <Link
        to="/SignUp"
        aria-label="Navigate to Word Party SignUp page"
        title="Sign Up"
      >
        <AiOutlineUserAdd aria-hidden='true' />
      </Link>
      <Link
        to="/ResetPassword"
        aria-label="Navigate to Word Party Reset Password page"
        title="Reset your password"
      >
        <RiLockPasswordLine aria-hidden='true' />
      </Link>
    </div>
  )
}

export default SignIn