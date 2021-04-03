import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import axios from "axios";

function ProductCard() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="products">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        product &&
        product.map((product, index) => (
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
