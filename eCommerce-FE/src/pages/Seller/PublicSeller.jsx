import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Seller.scss";
import ReactStars from "react-stars";
import { Link, useParams } from "react-router-dom";
import {
  productLists,
  productCategoryLists,
} from "../../redux/action/productListAction";

const PublicSeller = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);
  const category = useSelector((state) => state.productCategory.category);

  // filter
  // const [isClicked, setIsClicked] = useState();
  const [filter, setFilter] = useState();
  const filterCheck = (item) => {
    setFilter(item);
  };

  useEffect(() => {
    dispatch(productLists({ seller: id, category: filter ? filter : "" }));
    dispatch(productCategoryLists());
  }, [dispatch, filter, id]);

  // console.log(filter);

  return (
    <div className="sellerPage">
      <div>
        <h1>{productList.products[0]?.seller.seller.name}</h1>
        <p>{productList.products[0]?.seller.seller.description}</p>
      </div>
      <div className="search-page">
        <div className="search-category">
          <h2>Categories</h2>
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
