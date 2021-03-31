import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h3>This is admin</h3>
      <nav>
        <ul>
          <li>
            <Link to="/addProduct">Add Product</Link>
          </li>
          <li>
            <Link to="/manageProducts">Manage Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
