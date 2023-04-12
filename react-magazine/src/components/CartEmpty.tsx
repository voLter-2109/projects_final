import React from "react";
import cartEmpty from "../assets/img/cartEmp.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Cart is empty</h2>

        <img src={cartEmpty} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Shop</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
