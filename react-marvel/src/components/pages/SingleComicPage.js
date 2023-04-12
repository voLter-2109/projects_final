import "./singleComicPage.scss";
import { Link, useParams } from "react-router-dom";
import MarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spiner";

const SingleComicPage = (props) => {
  // debugger
  const [comic, setComic] = useState();
  const { comicId } = useParams();
  const { loading, error, getComics, clearError } = MarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComics(comicId).then((comic) => onComicLoaded(comic));
  };

  const onComicLoaded = (comic) => {
    console.log(comic)
    setComic(comic);
  };

  const errorMessage = error ? (
    <>
      <ErrorMessage />{" "}
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  return (
    <div className="single-comic mainBlock">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        <button className="button button-secondary">Back to all</button>
      </Link>
    </div>
  );
};

export default SingleComicPage;
