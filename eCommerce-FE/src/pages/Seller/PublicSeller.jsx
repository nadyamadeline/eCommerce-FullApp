import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Seller.scss";
import ReactStars from "react-stars";
import { Link, useParams } from "react-router-dom";
import {
  productLists,
  productCategoryLists,
} from "../../redux/action/productListAction";
import { price, rating } from "../../utils";

const PublicSeller = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);
  const category = useSelector((state) => state.productCategory.category);

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

  // sort
  const [order, setOrder] = useState("newest");

  useEffect(() => {
    dispatch(
      productLists({
        seller: id,
        category: filter ? filter : "",
        min: priceFilter && priceFilter?.min ? priceFilter?.min : 0,
        max: priceFilter && priceFilter?.max ? priceFilter?.max : 0,
        rating: ratingFilter ? ratingFilter : 0,
        order: order ? order : "newest",
      })
    );
    dispatch(productCategoryLists());
  }, [dispatch, filter, id, priceFilter, ratingFilter, order]);

  return (
    <div className="sellerPage">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>{productList.products[0]?.seller.seller.name}</h1>
          <p>{productList.products[0]?.seller.seller.description}</p>
        </div>
        <div>
          <select
            style={{ width: "250px", height: "2rem", fontSize: "1rem" }}
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="newest">Newest Arrival</option>
            <option value="topRated">Top Rated</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="search-page">
        <div className="search-category" style={{ width: "400px" }}>
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
          ) : (
            productList.products &&
            productList.products?.map((product, index) => (
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
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicSeller;
