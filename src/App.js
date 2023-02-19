import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { auth } from './modules/firebase'
import { onAuthStateChanged } from 'firebase/auth'
// components
import Home from "./Components/Home";
import SavedWords from "./Components/SavedWords";
import NotFound from "./Components/NotFound";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import AuthDetails from "./Components/auth/AuthDetails";
import UserAuth from "./Components/UserAuth";


const App = () => {
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [WordAddClassName, setWordAddClassName] = useState('');
  const [loggedIn, setLoggedIn] = useState(null);

  const authenticateUser = () => {
    // Detected if user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  }

  useEffect(() => {
    if (!loggedIn) {
      authenticateUser()
    }
  }, [loggedIn])

  if (loggedIn === null) return null;

  return (
    !loggedIn ?
      <>
        <Routes>
          <Route path="/" element={<UserAuth />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </>
      : <div className="App">
        <AuthDetails />
        <Header WordAddClassName={WordAddClassName} />
        {/* routes for home, saved words and incorrect url */}
        <Routes>
          <Route
            path="/"
            element={
              <Home setIsLoading={setIsLoading} setWordList={setWordList} wordList={wordList} isLoading={isLoading} setWordAddClassName={setWordAddClassName} />
            }
          />
          <Route path="/savedWords" element={<SavedWords setWordList={setWordList} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
