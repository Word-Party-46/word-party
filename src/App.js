import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
  return (
    <div className="App">
      <header> <h2>HEADER</h2> </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignIn />
              <SignUp />
              <AuthDetails />
            </>
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
