import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/action/cartAction";
import "./Cart.scss";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItem);

  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const history = useHistory();
  const handleCheckOut = () => {
    history.push(`/signin?redirect=shippping`);
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-header">
        <p>Item</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Subtotal</p>
      </div>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-items">
            <div className="cart-image">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "250px", height: "250px" }}
              />
              <p>{item.name}</p>
            </div>
            <div className="cart-item-qty">
              <button
                onClick={() =>
                  dispatch(addToCart(item.product, Number(item.qty) - 1))
                }
                disabled={item.qty <= 1}
              >
                -
              </button>
              <p>{Number(item.qty)}</p>
              <button
                onClick={() =>
                  dispatch(addToCart(item.product, Number(item.qty) + 1))
                }
                disabled={item.qty >= item.countInStock}
              >
                +
              </button>
            </div>
            <div>${item.price}</div>
            <div>${item.price * item.qty}</div>
            <div>
              <button onClick={() => handleDeleteItem(item.product)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="cart-total">
        <h3>Total:</h3>
        <p>{cart.reduce((a, c) => a + c.qty, 0)} items</p>
        <p>${cart.reduce((a, c) => a + c.price * c.qty, 0)}</p>
      </div>
      <div className="cart-checkout">
        <button onClick={handleCheckOut}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
