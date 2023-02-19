import { Link } from "react-router-dom";
import { AiFillFileWord, AiFillHome } from "react-icons/ai";
import { useRef } from "react";

const Header = ({ WordAddClassName }) => {
  const scrollToRef = useRef(null);

  return (
    <header ref={scrollToRef}>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              aria-label="Navigate to Word Party Home page"
              title="Home"
              onClick={() => scrollToRef.current.scrollIntoView({ behavior: "smooth" })}
            >
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link
              to="/savedWords"
              aria-label="Navigate to Word Party Saved Words page"
              title="Saved Words"
              className={WordAddClassName}
            >
              <AiFillFileWord />
            </Link>
          </li>
        </ul>
      </nav>
      <h1>Word Party</h1>
      <p>Step 1: Enter a word and select a category to expand your vocabulary</p>
      <p>Step 2: Add or remove words from your <Link
        to="/savedWords"
        aria-label="Navigate to Word Party Saved Words page"
        title="Saved Words"
      >Saved Words</Link> list</p>
    </header>
  )
}

export default Header;