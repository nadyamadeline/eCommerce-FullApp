import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDetail,
  updateUserProfile,
} from "../../../redux/action/userAction";
import { USER_UPDATE_RESET } from "../../../redux/actionType/userTypes";

const Profile = () => {
  // get current user data
  const userInfo = useSelector((state) => state.login.user);
  const detailUser = useSelector((state) => state.userDetail.userData);
  const dispatch = useDispatch();

  // edit profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const updateProfile = useSelector((state) => state.updateProfile);
  // console.log(isSeller);

  // Seller
  const [sellerName, setSellerName] = useState("");
  // const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  useEffect(() => {
    if (!detailUser || updateProfile.success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(userDetail(userInfo._id));
    } else {
      setName(detailUser.name);
      setEmail(detailUser.email);
      setIsSeller(detailUser.isSeller);
      if (userInfo.seller) {
        setSellerName(userInfo.seller.name);
        // setSellerLogo(userInfo.seller.logo);
        setSellerDescription(userInfo.seller.description);
      }
    }
  }, [dispatch, userInfo, detailUser, updateProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      userId: detailUser._id,
      name,
      email,
      password,
      isSeller,
      sellerName,
      sellerDescription,
    };
    if (password !== confirmPassword) {
      alert("Password does not match.");
    } else {
      dispatch(updateUserProfile(body));
    }
  };

  return (
    <div className="createProduct">
      <form onSubmit={submitHandler}>
        <div>
          <h1>My Profile</h1>
        </div>
        {/* {updateProfile.loading ? (
          <div>
            <p>Updating...</p>
          </div>
        ) : updateProfile.error ? (
          <div>{updateProfile.error}</div>
        ) : updateProfile.success ? (
          <div>
            <p>Updated successfully!</p>
          </div>
        ) : (
          ""
        )} */}
        <div>
          <div>
            <label htmlFor="">Name</label>
            <br />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Email</label>
            <br />
            <input
              type="email"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Password</label>
            <br />
            <input
              type="password"
              // required
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Confirm Password</label>
            <br />
            <input
              type="password"
              // required
              placeholder="******"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{ width: "20px" }}
              value={isSeller}
              checked={isSeller}
              onChange={(e) => setIsSeller(!isSeller)}
            />
            <label htmlFor="" style={{ marginLeft: "1rem" }}>
              Enable seller view
            </label>
          </div>
        </div>
        <br />
        <hr />
        <br />

        {isSeller || userInfo.isSeller ? (
          <div>
            <label>
              <h1>Shop</h1>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="">Shop Name</label>
                <br />
                <input
                  type="text"
                  placeholder="My Store"
                  required
                  onChange={(e) => setSellerName(e.target.value)}
                  value={sellerName}
                />
              </div>
              {/* <div style={{ marginTop: "1rem" }}>
                <label htmlFor="">Logo</label>
                <br />
                <input
                  id="name"
                  type="text"
                  placeholder="My Store"
                  required
                  onChange={(e) => setSellerLogo(e.target.value)}
                  value={sellerLogo}
                />
              </div> */}
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="">Description</label>
                <br />
                <input
                  type="text"
                  placeholder="Tableware specialist"
                  required
                  onChange={(e) => setSellerDescription(e.target.value)}
                  value={sellerDescription}
                />
              </div>
            </label>
          </div>
        ) : (
          ""
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ marginTop: "2rem" }}>
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
