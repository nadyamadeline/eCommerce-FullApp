import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import { productDetail } from "../../redux/action/productDetailAction";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetailReducer);
  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  return (
    <div className="productDetail">
      {product.loading ? (
        <p>Loading...</p>
      ) : product.error ? (
        <p>{product.error}</p>
      ) : (
        <div>
          <img
            src={product.product.image}
            style={{ width: "250px", height: "250px" }}
          />
          {product.product.countInStock > 0 ? (
            <div>
              <button>Add to Cart</button>
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
