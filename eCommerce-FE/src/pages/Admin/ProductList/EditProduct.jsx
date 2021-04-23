import React, { useEffect, useState } from "react";
import { productDetail } from "../../../redux/action/productDetailAction";
import "./CreateProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../../redux/action/adminAction";
import { PRODUCT_UPDATE_RESET } from "../../../redux/actionType/adminTypes";
// import axios from "axios";
import { app } from "../../../firebase/firebaseConfig";

const CreateProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");

  const product = useSelector((state) => state.productDetailReducer.product);
  const productUpdate = useSelector((state) => state.updateProduct);
  const userInfo = useSelector((state) => state.login.user);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (productUpdate.success) {
      if (userInfo.isAdmin) {
        history.push("/admin/productList");
      } else {
        history.push("/seller/products");
      }
    }
    if (
      (product && !product.name) ||
      product._id !== id ||
      productUpdate.success
    ) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(productDetail(id));
    } else {
      setName(product.name);
      setCategory(product.category);
      setBrand(product.brand);
      setImage(product.image);
      setPrice(product.price);
      setInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product, productUpdate, history, id, userInfo]);

  const editHandler = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      category: category,
      brand: brand,
      image: image,
      price: price,
      countInStock: inStock,
      description: description,
    };
    dispatch(updateProduct(id, body));
  };

  // upload image
  // const [loadingImage, setLoadingImage] = useState(false);
  // const [errorImage, setErrorImage] = useState("");
  // const user = useSelector((state) => state.login.user);
  // const uploadImageHandler = async (e) => {
  //   let file = e.target.files[0];
  //   let formData = new FormData();
  //   formData.append("image", file);
  //   setLoadingImage(true);

  //   try {
  //     const { data } = await axios.post("/api/uploads", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     setImage(data);
  //     setLoadingImage(false);
  //   } catch (error) {
  //     setErrorImage(error.message);
  //     setLoadingImage(false);
  //   }
  // };

  // firebase

  const onChangeHandler = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    setImage(await fileRef.getDownloadURL());
  };
  return (
    <div className="createProduct">
      <form onSubmit={editHandler}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Edit Product</h1>
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
              value={name}
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
              value={category}
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
              value={brand}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Image</label>
            <br />
            <input
              type="text"
              disabled
              placeholder="/images/img.jpeg"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Upload Image</label>
            <br />
            {/* <input
              type="file"
              label="Choose Image"
              onChange={uploadImageHandler}
            /> */}
            <input
              type="file"
              label="Choose Image"
              onChange={onChangeHandler}
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
              value={price}
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
              value={inStock}
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
              value={description}
            />
          </div>
        </div>
        <br />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
