import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/action/cartAction";
import "./Cart.scss";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItem);

  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const history = useHistory();
  const handleCheckOut = () => {
    history.push(`/signin?redirect=shipping`);
  };

  return (
    <div className="cart">
      <h1 style={{ marginBottom: "2rem" }}>Shopping Cart</h1>
      <div className="cart-header">
        <p style={{ width: "30%" }}>Item</p>
        <p style={{ width: "24%" }}>Quantity</p>
        <p style={{ width: "25%" }}>Price</p>
        <p>Subtotal</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>It's a bit empty here...</h2>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Shop now</p>
          </Link>
        </div>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-items">
            <div className="cart-image" style={{ width: "30%" }}>
              <img src={item.image} alt={item.name} />
              <p style={{ marginLeft: "2rem" }}>{item.name}</p>
            </div>
            <div className="cart-set-qty" style={{ width: "25%" }}>
              <button
                onClick={() =>
                  dispatch(addToCart(item.product, Number(item.qty) - 1))
                }
                disabled={item.qty <= 1}
                style={{ marginRight: "1rem" }}
              >
                -
              </button>
              <p>{Number(item.qty)}</p>
              <button
                onClick={() =>
                  dispatch(addToCart(item.product, Number(item.qty) + 1))
                }
                disabled={item.qty >= item.countInStock}
                style={{ marginLeft: "1rem" }}
              >
                +
              </button>
            </div>
            <div style={{ width: "25%", fontWeight: "600", fontSize: "18px" }}>
              ${item.price}
            </div>
            <div style={{ width: "14%", fontWeight: "600", fontSize: "18px" }}>
              ${item.price * item.qty}
            </div>
            <div>
              <button
                onClick={() => handleDeleteItem(item.product)}
                className="delete-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <div className="cart-total">
        <h3>
          Total{" "}
          <span style={{ fontWeight: 400 }}>
            ({cart.reduce((a, c) => a + c.qty, 0)} items)
          </span>{" "}
          :
        </h3>
        {/* <p>{cart.reduce((a, c) => a + c.qty, 0)} items</p> */}
        <p className="grand-total">
          ${cart.reduce((a, c) => a + c.price * c.qty, 0)}
        </p>
      </div>
      <div className="cart-checkout">
        <button onClick={handleCheckOut}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
