import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TSort, selectSort, setSort } from "../redux/slices/filterSlice";

type TPopupClick = MouseEvent & {
  composedPath: Node[];
};

export const sortList: TSort[] = [
  { name: "Rating ↓", sort: "rating" },
  { name: "Rating ↑", sort: "-rating" },
  { name: "Price ↓", sort: "price" },
  { name: "Price ↑", sort: "-price" },
  { name: "Title ↓", sort: "title" },
  { name: "Title ↑", sort: "-title" },
];

const Sort: React.FC = memo(() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispath = useDispatch();
  const sort = useSelector(selectSort);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: TSort) => {
    dispath(setSort(obj));
    setIsVisible(false);
  };

  useEffect(() => {
    const handelClickOutside = (e: MouseEvent) => {
      const _e = e as TPopupClick;
      if (sortRef.current && !_e.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", handelClickOutside);

    return () => {
      document.body.removeEventListener("click", handelClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Sort by:</b>
        <span
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {sort.name}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => {
              return (
                <li
                  className={sort.sort === obj.sort ? "active" : ""}
                  onClick={() => onClickListItem(obj)}
                  key={index}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
