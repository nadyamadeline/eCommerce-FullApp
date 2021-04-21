import React, { useEffect, useState } from "react";
import { createProduct } from "../../../redux/action/adminAction";
import "./CreateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.login.user);
  const productCreate = useSelector((state) => state.createProduct);

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
    if (!userInfo.isAdmin) {
      history.push(`/seller/products`);
    } else {
      history.push(`/admin/productList`);
    }
  };

  // useEffect(() => {
  //   if (productCreate.success) {
  //     history.push(`/admin/productList`);
  //   }
  // }, [productCreate]);

  // upload image
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const user = useSelector((state) => state.login.user);
  const uploadImageHandler = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setLoadingImage(true);

    try {
      const { data } = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setImage(data);
      setLoadingImage(false);
    } catch (error) {
      setErrorImage(error.message);
      setLoadingImage(false);
    }
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
              disabled
              placeholder="/images/img.jpeg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Upload Image</label>
            <br />
            <input
              type="file"
              label="Choose Image"
              onChange={uploadImageHandler}
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
