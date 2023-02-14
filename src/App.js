import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { AiFillFileWord, AiFillHome } from 'react-icons/ai'
// components
import Home from "./Components/Home";
import SavedWords from "./Components/SavedWords";

function App() {
  const [wordList, setWordList] = useState([]);
  function apiCall(currentCategory, searchWord) {
    if (currentCategory === "rhy") {
      axios({
        url: "https://api.datamuse.com/words",
        method: "GET",
        dataResponse: "json",
        params: {
          format: "json",
          rel_rhy: searchWord,
          max: 20,
        },
      })
        .then((response) => {
          if (response.data.length === 0) {
            throw new Error("Please enter a valid word");
          }
          setWordList(response.data);
        })
        .catch((errorMessage) => {
          alert(errorMessage);
        });
    } else if (currentCategory === "syn") {
      axios({
        url: "https://api.datamuse.com/words",
        method: "GET",
        dataResponse: "json",
        params: {
          format: "json",
          rel_syn: searchWord,
          max: 20,
        },
      })
        .then((response) => {
          if (response.data.length === 0) {
            throw new Error("Please enter a valid word");
          }
          setWordList(response.data);
        })
        .catch((errorMessage) => {
          alert(errorMessage);
        });
    }
  }
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" aria-label="Navigate to Word Party Home page" title="Home"><AiFillHome /></Link>
            </li>
            <li>
              <Link to="/savedWords" aria-label="Navigate to Word Party Saved Words page" title="Saved Words"><AiFillFileWord /></Link>
            </li>
          </ul>
        </nav>
        <h1>Word Party</h1>
        {/* add a <p> and explain what the app does*/}
      </header>
      <Routes>
        <Route path="/" element={<Home apiCall={apiCall} wordList={wordList} />} />


        <Route path="/savedWords" element={<SavedWords />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>



      <footer>
        <p>Made by Kyle, Umesh, and Vincent at Juno College</p>
      </footer>
    </div>
  );
}

export default App;
