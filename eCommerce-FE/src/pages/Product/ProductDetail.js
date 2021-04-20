import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.scss";
import { productDetail } from "../../redux/action/productDetailAction";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/action/cartAction";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

function ProductDetail() {
  // get product detail
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetailReducer);
  const product = useSelector((state) => state.productDetailReducer.product);

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  // set up add to cart
  const [count, setCount] = useState(1);
  const handleAddQty = () => {
    setCount(count + 1);
  };
  const handleMinusQty = () => {
    setCount(count - 1);
  };

  const handleAddToCart = (item, qty) => {
    dispatch(addToCart(item, qty));
  };

  return (
    <div className="productDetail-page">
      {productDetails.loading ? (
        <p>Loading...</p>
      ) : productDetails.error ? (
        <p>{productDetails.error}</p>
      ) : (
        <div className="product-detail">
          <img src={product.image} alt={product.name} className="detail-img" />
          <div className="detail-info">
            <h2>{product.name}</h2>
            <Link to={`/seller/${product.seller?._id}`}>
              <p style={{ marginTop: "1rem", fontWeight: "600" }}>
                {product && product.seller && product.seller.seller.name}
              </p>
            </Link>
            <div className="product-rating">
              <ReactStars
                count={5}
                value={product.rating}
                size={16}
                color2={"#fff200"}
                edit={false}
              />
              <p>
                {product.rating} ({product.numReviews} sold)
              </p>
            </div>
            <h2>${product.price}</h2>
            {product.countInStock > 0 ? (
              <div style={{ margin: "1.5rem 0" }}>
                <p className="col-success">In stock</p>
              </div>
            ) : (
              <div style={{ margin: "1.5rem 0" }}>
                <p className="col-danger">Sold out</p>
              </div>
            )}
            {product.countInStock > 0 ? (
              <div className="product-detail-actions">
                <div className="cart-set-qty">
                  <button
                    onClick={handleMinusQty}
                    disabled={count === 1}
                    style={{ marginRight: "1rem" }}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    onClick={handleAddQty}
                    disabled={count === product.countInStock}
                    style={{ marginLeft: "1rem" }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product._id, count)}
                  className="addCart-btn"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="detail-desc">
              <p style={{ fontWeight: "600", fontSize: "18px" }}>
                Description:
              </p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
