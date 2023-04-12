import "./charInfo.scss";
import PropTypes from "prop-types";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spiner";
import { useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import { Link } from "react-router-dom";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}

      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (thumbnail.search(/image_not_available/i)) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              href={homepage}
              className="button button-main"
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={wiki}
              className="button button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <Comics comics={comics} />
      </ul>
    </>
  );
};

export const Comics = (props) => {
  if (props.comics.length === 0) {
    return <li className="char__comics-item">not found comics</li>;
  }
  let commicsAll = props.comics.map((item, i) => {
    let comicId = item.resourceURI.split("comics/");
    if (i > 9) return;
    return (
      <Link
        to={`/comics/${comicId[1]}`}
        target="_blank"
        className="char__comics-item"
        key={i}
      >
        {item.name}
      </Link>
    );
  });
  return commicsAll;
};

CharInfo.propTypes = { charId: PropTypes.number };

export default CharInfo;
