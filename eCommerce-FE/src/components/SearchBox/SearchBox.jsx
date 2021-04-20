import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBox.scss";

const SearchBox = () => {
  const [name, setName] = useState();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${name}`);
  };
  return (
    <div className="search-box">
      <form action="" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
