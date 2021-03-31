import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import NoMatch from "./Components/NoMatch/NoMatch";
import Admin from "./Components/Admin/Admin";
import Login from "./Components/Login/Login";
import AddProduct from "./Components/AddProduct/AddProduct";
import ManageProduct from "./Components/ManageProduct/ManageProduct";

function App() {
  return (
    <div className="">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/deals">Deals</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <hr />
          </nav>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/manageProducts">
              <ManageProduct />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
