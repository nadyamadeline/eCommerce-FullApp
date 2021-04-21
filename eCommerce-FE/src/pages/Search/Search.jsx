import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import {
  productLists,
  productCategoryLists,
} from "../../redux/action/productListAction";
import { price, rating } from "../../utils";

const Search = () => {
  const { name = "all" } = useParams();
  //   console.log(name);
  const productList = useSelector((state) => state.productReducer);
  const category = useSelector((state) => state.productCategory.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productLists({ name: name !== "all" ? name : "" }));
    dispatch(productCategoryLists());
  }, [dispatch, name]);

  // filter for category
  const [filter, setFilter] = useState();
  const filterCheck = (item) => {
    setFilter(item);
  };

  // filter for price
  const [priceFilter, setPriceFilter] = useState();
  const priceFilterCheck = (item) => {
    setPriceFilter(item);
  };

  // filter for rating
  const [ratingFilter, setRatingFilter] = useState();
  const ratingFilterCheck = (item) => {
    setRatingFilter(item);
  };

  useEffect(() => {
    dispatch(
      productLists({
        category: filter ? filter : "",
        name: name !== "all" ? name : "",
      })
    );
    dispatch(productCategoryLists());
  }, [dispatch, filter, name]);
  return (
    <div className="sellerPage">
      <div>
        {/* <h1>{productList.products[0]?.seller.seller.name}</h1>
        <p>{productList.products[0]?.seller.seller.description}</p> */}
        <h1>
          {productList.products?.length === 0
            ? "No"
            : productList.products?.length}{" "}
          {productList.products?.length <= 1 ? "result" : "results"} for{" "}
          <span style={{ fontStyle: "italic" }}>'{name}'</span>
          ...
        </h1>
      </div>
      <div className="search-page">
        <div className="search-category">
          <div>
            <h2>Category</h2>
            {category &&
              category.map((cat, index) => (
                <div key={index} style={{ paddingTop: "1rem" }}>
                  <input
                    type="checkbox"
                    onChange={() => filterCheck(cat)}
                    checked={filter === cat}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <label htmlFor="">{cat}</label>
                </div>
              ))}
            <button onClick={() => setFilter()}>Remove Filter</button>
          </div>
          <br />
          <br />
          <div>
            <h2>Price</h2>
            {price &&
              price.map((price, index) => (
                <div key={index} style={{ paddingTop: "1rem" }}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      priceFilterCheck({ min: price.min, max: price.max })
                    }
                    checked={
                      priceFilter?.min === price.min &&
                      priceFilter?.max === price.max
                    }
                    style={{ marginRight: "0.5rem" }}
                  />
                  <label htmlFor="">{price.name}</label>
                </div>
              ))}
            <button onClick={() => setPriceFilter()}>Remove Filter</button>
          </div>
          <br />
          <br />
          <div>
            <h2>Rating</h2>
            {rating &&
              rating.map((rating, index) => (
                <div
                  key={index}
                  style={{
                    paddingTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={() => ratingFilterCheck(rating.rating)}
                    checked={ratingFilter === rating.rating}
                    style={{ marginRight: "0.5rem" }}
                  />

                  <ReactStars
                    count={5}
                    value={rating.rating}
                    size={16}
                    color2={"#fff200"}
                    edit={false}
                  />

                  <label htmlFor="" style={{ paddingLeft: "0.4rem" }}>
                    {rating.rating === 5 ? "" : "and above"}
                  </label>
                </div>
              ))}
            <button onClick={() => setRatingFilter()}>Remove Filter</button>
          </div>
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
