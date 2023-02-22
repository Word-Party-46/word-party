// modules
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai"
// local imports
import throwAlert from "../modules/alerts";
import { auth } from "../modules/firebase";

const SignUp = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // console.log(useCredentials)
        // console.log(useCredentials.user.uid);
        setLoggedIn(true)
        navigate("/");
      })
      .catch((error) => {
        throwAlert(error.message);
      })
  }

  return (
    <div className="sign-up wrapper">
      <form onSubmit={handleSubmit}>
        <h3>Create an Account</h3>
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
        <button type="submit" title="Sign In" aria-label="Sign In"><AiOutlineUserAdd aria-hidden="true" /></button>
      </form>
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

export default SignUp