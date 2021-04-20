import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Seller.scss";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import { productLists } from "../../redux/action/productListAction";

const Seller = (props) => {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const sellerInfo = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(productLists({ seller: sellerMode ? sellerInfo._id : "" }));
  }, [dispatch, sellerMode, sellerInfo]);
  return (
    <div className="sellerPage">
      <div>
        <h1>{sellerInfo.seller.name}</h1>
        <p>{sellerInfo.seller.description}</p>
      </div>
      <div className="products-container">
        {productList.loading ? (
          <p>Loading...</p>
        ) : productList.error ? (
          <p>{productList.error}</p>
        ) : (
          productList.products &&
          productList.products.map((product, index) => (
            <Link
              to={`/products/${product._id}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <div className="products">
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <p className="product-name" style={{ fontSize: "1.15rem" }}>
                    {product.name.toUpperCase()}
                  </p>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className="product-price">${product.price}</p>
                    {/* <Link
                      to={`/seller/${product.seller._id}`}
                      style={{ fontSize: "14px" }}
                    >
                      <p style={{ paddingRight: "0.5rem" }}>
                        {product.seller.seller.name}
                      </p>
                    </Link> */}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Seller;
