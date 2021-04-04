import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productLists } from "../../redux/action/productListAction";

function ProductCard() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(productLists());
  }, [dispatch]);

  return (
    <div className="product-container">
      {productList.loading ? (
        <p>Loading...</p>
      ) : productList.error ? (
        <p>{productList.error}</p>
      ) : (
        productList.products &&
        productList.products.map((product, index) => (
          <Link to={`/products/${product._id}`}>
            <div className="products" key={index}>
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.rating}</p>
                <p>{product.price}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductCard;
