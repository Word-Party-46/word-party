// modules
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineLogin } from 'react-icons/ai'
// local imports
import { auth } from '../modules/firebase'
import throwAlert from "../modules/alerts";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetRequested(true);
        setTimeout(() => {
          navigate("/");
        }, 7000);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          throwAlert(`We can't seem to find your account. Please check to see that you entered your email correctly.`)
        } else {
          throwAlert(`${error.message} Please try again.`);
        }
      });
  }
  return (
    <div className="reset-password wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Reset your password</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email" />
        <button type="submit" onSubmit={handleSubmit} aria-label="Send password reset email"
          title="Send password reset email"><RiLockPasswordLine aria-hidden="true" /></button>
      </form>
      {
        !resetRequested ? null : <><p>Please check your inbox for password reset instructions</p><p>You will be redirected to the login page shortly...</p></>
      }
      <Link
        to="/"
        aria-label="Navigate to Word Party SignIn page"
        title="SignIn"
      >
        <AiOutlineLogin aria-hidden="true" />
      </Link>
    </div>
  )
}

export default ResetPassword