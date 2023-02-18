import firebase from "./../modules/firebase";
import { getDatabase, push, ref, get } from "firebase/database";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useRef } from "react";
import throwAlert from "../modules/alerts";
import uuid from 'react-uuid';

const Results = ({ wordList, setWordAddClassName }) => {
  const scrollToRef = useRef(null);

  useEffect(() => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  }, [wordList]);

  const handleClick = (e) => {
    const wordToAdd = e.currentTarget.dataset.value;
    const database = getDatabase(firebase);
    const dbRef = ref(database);

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

    setWordAddClassName('animate');

    setTimeout(() => {
      setWordAddClassName('');
    }, 600);
  };

  return (
    <section className="results wrapper" ref={scrollToRef}>
      <h2>Results</h2>
      <ul>
        {wordList.map((wordReturn) => {
          const word = wordReturn.word
          return (
            <li key={uuid()}>
              <p>{word}</p>
              <button
                onClick={handleClick}
                aria-label="Add word to Saved Words"
                title="Save word"
                data-value={word}
              >
                <IoMdAddCircle />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Results;
