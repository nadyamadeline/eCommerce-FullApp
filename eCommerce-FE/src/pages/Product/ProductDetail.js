import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import { productDetail } from "../../redux/action/productDetailAction";
import { useHistory, useParams } from "react-router-dom";
import { addToCart } from "../../redux/action/cartAction";

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
  const handleAddQty = (max) => {
    count < max ? setCount(count + 1) : setCount(max);
  };
  const handleMinusQty = () => {
    count > 1 ? setCount(count - 1) : setCount(1);
  };

  const history = useHistory();
  const handleAddToCart = (item, qty) => {
    dispatch(addToCart(item, qty));
  };

  return (
    <div className="productDetail">
      {productDetails.loading ? (
        <p>Loading...</p>
      ) : productDetails.error ? (
        <p>{productDetails.error}</p>
      ) : (
        <div>
          <img
            src={product.image}
            style={{ width: "250px", height: "250px" }}
          />
          {product.countInStock > 0 ? (
            <div>
              <p>In stock</p>
            </div>
          ) : (
            <div>
              <p>Item unavailable</p>
            </div>
          )}
          {product.countInStock > 0 ? (
            <div>
              <div>
                <button onClick={handleMinusQty}>-</button>
                <p>{count}</p>
                <button onClick={() => handleAddQty(product.countInStock)}>
                  +
                </button>
              </div>
              <button onClick={() => handleAddToCart(product._id, count)}>
                Add to Cart
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
