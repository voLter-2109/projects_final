import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spiner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import VanillaTilt from "vanilla-tilt";
import "./comicsList.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ButtonCharListjsjs from "../charList/ButtonCharList";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      VanillaTilt.init(node, {
        scale: 1.01,
        speed: 300,
        max: 10,
        axis: "x",
      });
    }
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 9) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setnewItemLoading(false);
    setOffset(offset + 9);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <CSSTransition
          key={i}
          timeout={500}
          classNames="comics__item"
          in={true}
        >
          <li className="comics__item" key={i} ref={measuredRef}>
            <Link to={`/comics/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="comics__item-img"
              />
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="comics__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spiner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}

      <ButtonCharListjsjs
        newItemLoading={newItemLoading}
        comicsEnded={comicsEnded}
        onRequest={onRequest}
        offset={offset}
        loading={loading}
      />
    </div>
  );
};

export default ComicsList;
