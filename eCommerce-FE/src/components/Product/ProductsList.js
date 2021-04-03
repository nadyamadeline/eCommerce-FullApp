import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productLists } from "../../redux/action/productListAction";

function ProductCard() {
  // const [product, setProduct] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get("/api/products");
  //       setLoading(false);
  //       setProduct(data);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(productLists());
  }, [dispatch]);

  return (
    <div className="products">
      {productList.loading ? (
        <p>Loading...</p>
      ) : productList.error ? (
        <p>{productList.error}</p>
      ) : (
        productList.products &&
        productList.products.map((product, index) => (
          <Link to={`/products/${product._id}`}>
            <div key={index} className="product-img">
              <img src={product.image} alt={product.name} />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductCard;
