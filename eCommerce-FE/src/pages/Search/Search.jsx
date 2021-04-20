import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { productLists } from "../../redux/action/productListAction";

const Search = () => {
  const { name = "all" } = useParams();
  //   console.log(name);
  const productList = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productLists({ name: name !== "all" ? name : "" }));
  }, [dispatch, name]);
  return (
    <div className="sellerPage">
      <div>
        {/* <h1>{productList.products[0]?.seller.seller.name}</h1>
        <p>{productList.products[0]?.seller.seller.description}</p> */}
        <h1>
          {productList.products?.length == 0
            ? "No"
            : productList.products?.length}{" "}
          {productList.products?.length <= 1 ? "result" : "results"} for{" "}
          <span style={{ fontStyle: "italic" }}>'{name}'</span>
          ...
        </h1>
      </div>
      <div className="search-page">
        <div className="search-category">
          <h2>Category</h2>
        </div>
        <div className="products-container">
          {productList.loading ? (
            <p>Loading...</p>
          ) : productList.error ? (
            <p>{productList.error}</p>
          ) : productList.products.length > 0 ? (
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
                      <Link
                        to={`/seller/${product.seller._id}`}
                        style={{ fontSize: "14px" }}
                      >
                        <p style={{ paddingRight: "0.5rem" }}>
                          {product.seller.seller.name}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="search-not-found">
              <p>Product not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
