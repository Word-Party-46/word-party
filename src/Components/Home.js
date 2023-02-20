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
  return (
    <>
      <Form
        setWordResultList={setWordResultList}
        setApiIsLoading={setApiIsLoading}
      />
      <Loader apiIsLoading={apiIsLoading} />
      {wordResultList.length === 0 ? null : (
        <Results
          wordResultList={wordResultList}
          setSavedWordIconToggleClassName={setSavedWordIconToggleClassName} userId={userId}
        />
      )}
    </>
  );
};

export default Home;
