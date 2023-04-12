import React, { useCallback, useRef, useState } from "react";
import style from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const dispatch = useDispatch();

  const debounceInput = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    [dispatch]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    debounceInput(e.currentTarget.value);
  };

  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  return (
    <div className={style.root}>
      <input
        className={style.input}
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        type="text"
        placeholder="Search..."
      ></input>
      <svg
        className={style.icon}
        enableBackground="new 0 0 70 70"
        height="70px"
        id="Icons"
        version="1.1"
        viewBox="0 0 70 70"
        width="70px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M51.957,49.129l-8.713-8.713c1.75-2.337,2.799-5.229,2.799-8.373c0-7.732-6.268-14-14-14s-14,6.268-14,14s6.268,14,14,14  c3.144,0,6.036-1.049,8.373-2.799l8.713,8.713L51.957,49.129z M22.043,32.043c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10  c0,5.514-4.486,10-10,10C26.529,42.043,22.043,37.557,22.043,32.043z" />
      </svg>
      {value && (
        <div onClick={onClickClear} className={style.closeItem}>
          &Chi;
        </div>
      )}
    </div>
  );
};

export default Search;
