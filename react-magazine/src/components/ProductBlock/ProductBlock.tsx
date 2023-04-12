//lib
import React, { useState } from "react";
// comoponent
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  TCartItem,
  addItem,
  selectCartItemById,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const typeNames: string[] = ["male", "female"];

type TProductBlockProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

const ProductBlock: React.FC<TProductBlockProps> = ({
  id,
  imageUrl,
  name,
  price,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setSize] = useState<number>(0);
  const [activeImg, setActiveImg] = useState<number>(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    console.log(addedCount);
    const item: TCartItem = {
      id: id + typeNames[activeType] + sizes[activeSize],
      imageUrl,
      price,
      name,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };
  const onMouseEnter = () => {
    setActiveImg(1);
  };
  const onMouseLeave = () => {
    setActiveImg(0);
  };

  return (
    <div className="product-block-wrapper">
      <div className="product-block">
        <div className="product-block__image">
          <img
            src={imageUrl[activeImg]}
            alt="font img"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          <Link to={"/product/" + id}>
            <svg
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
          </Link>
        </div>
        <div className="product-block__title">
          <h4>{name}</h4>
        </div>
        <div className="product-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => setActiveType(index)}
                key={type}
                className={activeType === type ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  onClick={() => setSize(index)}
                  key={index}
                  className={activeSize === index ? "active" : ""}
                >
                  {size}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">
            from {price.toLocaleString("ru")} ₩
          </div>
          <div
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span> Add</span>
            {addedCount !== 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
