import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";
import "./Cart.scss";

function Cart() {
  const { id } = useParams();
  const location = useLocation().search.split("=");
  const qty = location[1];

  //   console.log(`qty`, qty);
  //   console.log(`params`, id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div className="cart">
      <h1>Cart Screen</h1>
      <p>Product ID: {id}</p>
      <p>Quantity: {qty}</p>
    </div>
  );
}

export default Cart;
