// modules
import { useState } from "react";
// components
import Form from "./Form";
import Loader from "./Loader";
import Results from "./Results";

const Home = ({
  wordResultList,
  apiIsLoading,
  setApiIsLoading,
  setWordResultList,
  setSavedWordIconToggleClassName, userId
}) => {
  const [searchWord, setSearchWord] = useState("");
  const [currentCategoryName, setCurrentCategoryName] = useState("");

  return (
    <>
      <Form
        setWordResultList={setWordResultList}
        setApiIsLoading={setApiIsLoading}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setCurrentCategoryName={setCurrentCategoryName}
      />
      <Loader apiIsLoading={apiIsLoading} />
      {wordResultList.length === 0 ? null : (
        <Results
          wordResultList={wordResultList}
          setSavedWordIconToggleClassName={setSavedWordIconToggleClassName}
          userId={userId}
          searchWord={searchWord}
          currentCategoryName={currentCategoryName}
        />
      )}
    </>
  );
};

export default Home;
