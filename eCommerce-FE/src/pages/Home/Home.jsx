import React from "react";
import "./Home.scss";

import ProductsList from "../../components/Product/ProductsList";

function Home() {
  return (
    <div className="home">
      <div className="jumbotron">
        <div className="tagline">
          <h1>Better Home Living</h1>
          <p>Your home like never before.</p>
          <button>Shop Now</button>
        </div>
      </div>
      <div className="featured">
        <h2>Our Products</h2>

        <ProductsList />
      </div>
    </div>
  );
}

export default Home;
