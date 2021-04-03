import React from "react";
import Home from "./pages/Home/Home";
import "./components/Navbar/Navbar";
import Navbar from "./components/Navbar/Navbar";
import Product from "./pages/Product/Product";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/:id" component={Product} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
