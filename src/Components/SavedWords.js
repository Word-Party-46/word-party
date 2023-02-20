// modules
import { getDatabase, onValue, remove, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { IoMdRemoveCircle } from "react-icons/io";
// local imports
import firebase from "../modules/firebase";

const SavedWords = ({ setWordResultList, setSavedWordIconToggleClassName, userId }) => {
  // variable used to store words from firebase database
  const [savedWords, setSavedWords] = useState([]);

  // fetches the database saved words by unique id for each word
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${userId}`);

    // listens for changes in database
    onValue(dbRef, (response) => {
      const data = response.val();
      const savedWordArray = [];
      for (const wordId in data) {
        savedWordArray.push({
          wordId,
          savedWord: data[wordId],
        });
      }
      setSavedWords(savedWordArray);
    });
    return () => {
      // when component unmounts clear the results component
      setWordResultList([]);
    };
  }, [setWordResultList, userId]);

  const handleRemoveWord = (wordId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${userId}/${wordId}`);
    remove(dbRef);

    setSavedWordIconToggleClassName("animateRemove");

    setTimeout(() => {
      setSavedWordIconToggleClassName("");
    }, 600);
  };

  return (
    <section className="saved-words wrapper">
      <h2>Saved Words</h2>
      <ul>
        {savedWords.map((word) => {
          return (
            <li key={word.wordId}>
              <p>{word.savedWord}</p>
              <button
                onClick={() => {
                  handleRemoveWord(word.wordId);
                }}
                aria-label="Remove word from Saved Words"
                title="Remove word"
              >
                <IoMdRemoveCircle aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SavedWords;
