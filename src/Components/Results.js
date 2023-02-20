// modules
import { getDatabase, push, ref, get } from "firebase/database";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useRef } from "react";
import uuid from "react-uuid";
// local imports
import firebase from "./../modules/firebase";
import throwAlert from "../modules/alerts";

const Results = ({ wordResultList, setSavedWordIconToggleClassName, userId }) => {
  // variable to implement scroll effect when results component is mounted
  const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  }, [wordResultList]);

  const handleClick = (e) => {
    // adding words to saved list database
    const wordToAdd = e.currentTarget.dataset.value;
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${userId}`);

    // get to check whether or not word is already in database and add if its not
    get(dbRef)
      .then((snapshot) => {
        const wordDataBase = snapshot.val();
        let containsWord = false;
        for (let wordEntry in wordDataBase) {
          if (wordToAdd !== wordDataBase[wordEntry]) {
            continue;
          } else {
            containsWord = true;
          }
        }
        if (containsWord === false) {
          push(dbRef, wordToAdd);
        }
      })
      .catch((error) => {
        throwAlert(error.message);
      });

    setSavedWordIconToggleClassName("animate");

    // enables animation to happen multiple times
    setTimeout(() => {
      setSavedWordIconToggleClassName("");
    }, 600);
  };

  return (
    <section className="results wrapper" ref={scrollToRef}>
      <h2>Results</h2>
      <ul>
        {wordResultList.map((wordReturn) => {
          const uid = uuid();
          return (
            <li key={uid}>
              <p>{wordReturn.word}</p>
              <button
                onClick={handleClick}
                aria-label="Add word to Saved Words"
                title="Save word"
                data-value={wordReturn.word}
              >
                <IoMdAddCircle aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Results;
