import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from '../../modules/firebase'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredentials) => {
        console.log(useCredentials)
      })
      .catch((error) => {
        console.log(error.message);
      })
    // 
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignIn