import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
  const [selectdChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar((selectdChar) => (selectdChar = id));
  };

  return (
    <>
      <div className="content">
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <div style={{ position: "sticky", top: 0 }}>
            <ErrorBoundary>
              <CharInfo charId={selectdChar} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharSearchForm />
            </ErrorBoundary>
            <img className="bg-decoration" src={decoration} alt="vision" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
