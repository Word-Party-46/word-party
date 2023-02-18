import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from '../../modules/firebase'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredentials) => {
        console.log(useCredentials)
      })
      .catch((error) => {
        console.log(error.message);
      })
    // 
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp