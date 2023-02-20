import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai"
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
    <div className="sign-up">
      <form onSubmit={handleSubmit}>
        <h3>Create Account</h3>
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
        <button type="submit"><AiOutlineUserAdd /></button>
      </form>
      <p>Already have an acount?</p>
      <Link
        to="/"
        aria-label="Navigate to Word Party SignIn page"
        title="SignIn"
      >
        <AiOutlineLogin />
      </Link>
    </div>
  )
}

export default SignUp