import { Link } from "react-router-dom";

const UserAuth = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/SignIn"
            aria-label="Navigate to Word Party SignIn page"
            title="SignIn"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/SignUp"
            aria-label="Navigate to Word Party SignUp page"
            title="SignUp"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserAuth