import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productLists } from "../../../redux/action/productListAction";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../redux/action/adminAction";
import { PRODUCT_DELETE_RESET } from "../../../redux/actionType/adminTypes";

const ProductList = () => {
  const productList = useSelector((state) => state.productReducer);
  const products = productList.products;
  const dispatch = useDispatch();

  const productDelete = useSelector((state) => state.deleteProduct);
  useEffect(() => {
    if (productDelete.success) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(productLists());
  }, [dispatch, productDelete]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(id));
    }
  };
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
          <button className="createProduct-btn">Create Product</button>
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
                        <Link to={`/products/${product._id}/edit`}>
                          <button style={{ marginRight: "0.5rem" }}>
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          Delete
                        </button>
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
