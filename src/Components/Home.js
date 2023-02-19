import Form from "./Form";
import Results from "./Results";
import Loader from "./Loader";

const Home = ({ wordList, isLoading, setIsLoading, setWordList, setWordAddClassName, userId }) => {
  return (
    <>
      <Form setWordList={setWordList} setIsLoading={setIsLoading} />
      <Loader isLoading={isLoading} />
      {
        (wordList.length === 0) ? null :
          <Results wordList={wordList} setWordAddClassName={setWordAddClassName} userId={userId} />
      }
    </>
  );
};

export default Home;
