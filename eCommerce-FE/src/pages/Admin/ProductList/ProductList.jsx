import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productLists } from "../../../redux/action/productListAction";
import { Link } from "react-router-dom";

const ProductList = () => {
  const productList = useSelector((state) => state.productReducer);
  const products = productList.products;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productLists());
  }, [dispatch]);

  const deleteProductHandler = () => {};
  //   const createProductHandler = () => {};
  return (
    <div className="order-history">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Products</h1>
        <Link to={`/admin/products/create`}>
          <button style={{ padding: "12px 16px", fontSize: "16px" }}>
            Create Product
          </button>
        </Link>
      </div>
      {productList.loading ? (
        <p>Loading...</p>
      ) : productList.error ? (
        <p>{productList.error}</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={`/products/${product._id}`}
                        style={{
                          fontWeight: 600,
                          color: "#4c4036",
                        }}
                      >
                        {product._id}
                      </Link>
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <div>
                        <Link to={`/product/${product._id}/edit`}>
                          <button style={{ marginRight: "0.5rem" }}>
                            Edit
                          </button>
                        </Link>

                        <button onClick={deleteProductHandler}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
