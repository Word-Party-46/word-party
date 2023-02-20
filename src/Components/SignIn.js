import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from '../modules/firebase'
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai"
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
        throwAlert((error.message));
      })
  }

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <h3>Log in to your account</h3>
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} />
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
        <button type="submit" onSubmit={handleSubmit}><AiOutlineLogin /></button>
      </form>
      <Link
        to="/SignUp"
        aria-label="Navigate to Word Party SignUp page"
        title="SignUp"
      >
        <AiOutlineUserAdd />
      </Link>
    </div>
  )
}

export default SignIn