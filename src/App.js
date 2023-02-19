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


const App = () => {
  const [wordList, setWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [WordAddClassName, setWordAddClassName] = useState('');
  const [loggedIn, setLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  const authenticateUser = () => {
    // Detected if user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
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
    <div className="App">
      {
        !loggedIn ?
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          :
          <>
            <AuthDetails setWordList={setWordList} />
            <Header WordAddClassName={WordAddClassName} />
            {/* routes for home, saved words and incorrect url */}
            <Routes>
              <Route
                path="/"
                element={
                  <Home setIsLoading={setIsLoading} setWordList={setWordList} wordList={wordList} isLoading={isLoading} setWordAddClassName={setWordAddClassName} userId={userId} />
                }
              />
              <Route path="/savedWords" element={<SavedWords setWordList={setWordList} userId={userId} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
      }
    </div>

  );
}

export default App;
