// modules
import { useState } from "react";
// local imports
import throwAlert from "../modules/alerts";
import apiCall from "../modules/api";

const Form = ({
  setApiIsLoading,
  setWordResultList,
  setSearchWord,
  searchWord,
  setCurrentCategoryName }) => {
  const [currentCategory, setCurrentCategory] = useState("");

  // handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // setWordResultList to reset words from previous search
    setWordResultList([]);
    //  wordCheck to make sure user inputs a word using only letters
    const wordCheck = /[^a-z]/gi;
    if (!wordCheck.test(searchWord.trim())) {
      apiCall(
        currentCategory,
        searchWord.trim(),
        setApiIsLoading,
        // setWordResultList to mount results on page
        setWordResultList
      );
      // stores the full category name from the form submission
      setCurrentCategoryName(e.target["1"][e.target["1"].selectedIndex].text);
    } else {
      throwAlert("Only valid words with letters are accepted!");
    }
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="wrapper">
      <div className="inputs-container">
        <div className="input-unit">
          <label htmlFor="searchWord">Word: </label>
          <input
            id="searchWord"
            type="text"
            placeholder="Enter Word"
            required
            onChange={handleSearchWordChange}
            value={searchWord}
          />
        </div>
        <div className="input-unit">
          <label>Category: </label>
          <select
            value={currentCategory}
            onChange={handleCategoryChange}
            required
          >
            {/* datamuse api category options */}
            <option disabled value="">
              Please Select
            </option>
            <option value="jjb" required>
              Adjectives
            </option>
            <option value="ant" required>
              Antonyms
            </option>
            <option value="cns" required>
              Consonant Match
            </option>
            <option value="hom" required>
              Homophones
            </option>
            <option value="nry" required>
              Near Rhymes
            </option>
            <option value="jja" required>
              Nouns
            </option>
            <option value="rhy" required>
              Rhymes
            </option>
            <option value="syn" required>
              Synonyms
            </option>
            <option value="trg" required>
              Triggers
            </option>
          </select>
        </div>
        <button onSubmit={handleSubmit}>Submit</button>
      </div>
    </form>
  );
};

export default Form;
