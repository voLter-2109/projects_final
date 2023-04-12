import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import "./singleCharacterLayout.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Comics } from "../charInfo/CharInfo";

const SingleCharacterLayout = () => {
  const { charName } = useParams();
  const [char, setChar] = useState(false);

  const { loading, error, getCharacterByName, clearError } = MarvelService();

  const onCharLoaded = (char) => {
    console.log(char);
    setChar(char);
  };
  useEffect(() => {
    console.log(charName);
    clearError();
    getCharacterByName(charName, true).then(onCharLoaded);
  }, []);

  const errorMessage = error ? (
    <>
      <ErrorMessage />
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? (
    <div className="single-comic mainBlock">
      <img
        src={char.thumbnail}
        alt={char.name}
        className="single-comic__char-img"
      />

      <div className="single-comic__info">
        <h2 className="single-comic__name">{char.name}</h2>
        <p className="single-comic__descr">{char.description}</p>
        <h2 className="single-comic__name" style={{margin:"20px 0"}}>Comics</h2>
        <Comics comics={char.comics} />
      </div>
      <div className="single-comic__btn">
        <div style={{textAlign:"center"}}>
          <a
            style={{ marginBottom: "20px" }}
            href={char.homepage}
            className="button button-main"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">homepage</div>
          </a>
          <a
            href={char.wiki}
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
        <Link to="/">
          <button type="submit" className="button button-main">
            <div className="inner">Come Back</div>
          </button>
        </Link>
      </div>
    </div>
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SingleCharacterLayout;
