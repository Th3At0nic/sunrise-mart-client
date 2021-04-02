import "./App.css";
import React, { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import NoMatch from "./Components/NoMatch/NoMatch";
import Admin from "./Components/Admin/Admin";
import Login from "./Components/Login/Login";
import AddProduct from "./Components/AddProduct/AddProduct";
import ManageProduct from "./Components/ManageProduct/ManageProduct";
import Orders from "./Components/Orders/Orders";
import CheckOut from "./Components/CheckOut/CheckOut";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
              <PrivateRoute path="/admin">
                <Admin />
              </PrivateRoute>
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
              <PrivateRoute path="/addProduct">
                <AddProduct />
              </PrivateRoute>
              <PrivateRoute path="/manageProducts">
                <ManageProduct />
              </PrivateRoute>
              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/checkout/:id">
                <CheckOut />
              </PrivateRoute>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
