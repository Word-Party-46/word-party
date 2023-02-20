// modules
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// components
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import SavedWords from "./Components/SavedWords";
// local imports
import "./App.css";
import LogOut from "./Components/LogOut";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./modules/firebase";

const App = () => {
  // wordResultList is populated with searched word results from api
  const [wordResultList, setWordResultList] = useState([]);
  // while api call is happening word party logo spins
  const [apiIsLoading, setApiIsLoading] = useState(false);
  // state for adding/removing animation for adding/removing saved words
  const [savedWordIconToggleClassName, setSavedWordIconToggleClassName] =
    useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const authenticateUser = () => {
    // Detects if user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        setUserEmail(user.email);
      } else {
        setUserId(null)
        setUserEmail(null);
      }
    })
  }

  useEffect(() => {
    authenticateUser();
  }, [loggedIn])

  return (
    <div className="App">
      <Header savedWordIconToggleClassName={savedWordIconToggleClassName} />
      {
        !(userId) ?
          <>
            <Routes>
              <Route path='/' element={<SignIn setLoggedIn={setLoggedIn} />} />
              <Route path='/SignUp' element={<SignUp setLoggedIn={setLoggedIn} />} />
              {/* route for incorrect URL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </> :
          <>
            <LogOut userEmail={userEmail} setLoggedIn={setLoggedIn} />
            <Routes>
              <Route
                path="/"
                element={
                  // Includes form and results components
                  <Home
                    setApiIsLoading={setApiIsLoading}
                    setWordResultList={setWordResultList}
                    wordResultList={wordResultList}
                    apiIsLoading={apiIsLoading}
                    setSavedWordIconToggleClassName={setSavedWordIconToggleClassName}
                    userId={userId}
                  />
                }
              />
              <Route
                path="/savedWords"
                element={
                  <SavedWords
                    setWordResultList={setWordResultList}
                    setSavedWordIconToggleClassName={setSavedWordIconToggleClassName} userId={userId}
                  />
                }
              />
              {/* route for incorrect URL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
      }
      <Footer />
    </div>
  );
};

export default App;
