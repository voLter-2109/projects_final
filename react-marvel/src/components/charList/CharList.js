import { useState, useEffect, useRef } from "react";
import Spiner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ButtonCharListjsjs from "./ButtonCharList";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(250);
  const [charEnded, setCharEnded] = useState(false);

  const itemsRef = useRef([]);

  const { loading, error, getAllCharacters } = MarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const focusCharItem = (id, i) => {
    itemsRef.current.forEach((item) => {
      if (item === null) {
        return;
      }
      item.classList.remove("char__item_selected");
    });
    props.onCharSelected(id);
    itemsRef.current[i].classList.add("char__item_selected");
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail.search(/image_not_available/i)) {
        imgStyle = { objectFit: "contain" };
      }

      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            tabIndex={0}
            className="char__item"
            key={item.id}
            onClick={() => {
              focusCharItem(item.id, i);
            }}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                focusCharItem(item.id, i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spiner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <ButtonCharListjsjs
        newItemLoading={newItemLoading}
        charEnded={charEnded}
        onRequest={onRequest}
        offset={offset}
        loading={loading}
      />
      {/* <button
        className="button button-main button-long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">{loading ? "loading..." : "load more"}</div>
      </button> */}
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
