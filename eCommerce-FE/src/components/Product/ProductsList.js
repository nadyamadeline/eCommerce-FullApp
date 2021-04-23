import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { productLists } from "../../redux/action/productListAction";
import ReactStars from "react-stars";

function ProductCard() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(productLists({}));
  }, [dispatch]);

  return (
    <div className="products-container">
      {productList.loading ? (
        <p>Loading...</p>
      ) : productList.error ? (
        <p>{productList.error}</p>
      ) : (
        productList.products &&
        productList.products.map((product, index) => (
          <Link
            to={`/products/${product?._id}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <div className="products">
              <div className="product-img">
                <img src={product?.image} alt={product?.name} />
              </div>
              <div className="product-info">
                <p className="product-name" style={{ fontSize: "1.15rem" }}>
                  {product?.name.toUpperCase()}
                </p>
                <div className="product-rating">
                  <ReactStars
                    count={5}
                    value={product?.rating}
                    size={16}
                    color2={"#fff200"}
                    edit={false}
                  />
                  <p>
                    {product?.rating} ({product?.numReviews} sold)
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="product-price">${product?.price}</p>
                  <Link
                    to={`/seller/${product.seller?._id}`}
                    style={{ fontSize: "14px" }}
                  >
                    <p style={{ paddingRight: "0.5rem" }}>
                      {product.seller.seller?.name}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductCard;
