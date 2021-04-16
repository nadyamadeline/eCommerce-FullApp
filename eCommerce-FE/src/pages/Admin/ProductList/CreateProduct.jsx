import React, { useState } from "react";
import { createProduct } from "../../../redux/action/adminAction";
import "./CreateProduct.scss";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setimage] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const submitHandler = () => {
    const body = {
      name: name,
      category: category,
      brand: brand,
      image: image,
      price: price,
      countInStock: inStock,
      description: description,
    };
    dispatch(createProduct(body));
  };
  return (
    <div className="createProduct">
      <form onSubmit={submitHandler}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Create Product</h1>
        </div>

        <div>
          <div>
            <label htmlFor="">Name</label>
            <br />
            <input
              id="name"
              type="text"
              placeholder="CERRA Table"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Category</label>
            <br />
            <input
              type="text"
              placeholder="Furniture"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Brand</label>
            <br />
            <input
              type="text"
              required
              placeholder="Sierra"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Image</label>
            <br />
            <input
              type="text"
              required
              placeholder="/images/img.jpeg"
              onChange={(e) => setimage(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Price</label>
            <br />
            <input
              type="text"
              required
              placeholder="100"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">In Stock</label>
            <br />
            <input
              type="text"
              required
              placeholder="10"
              onChange={(e) => setInStock(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Description</label>
            <br />
            <textarea
              type="text"
              required
              placeholder="Lovely table with gold lining"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
