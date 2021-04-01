import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5009/manageProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h3>Manage your products here</h3>
      {products.map((product) => (
        <h4>
          <Table>
            <th>
              <td>{product.name}</td>
              <td>{product.weight}</td>
              <td>৳ {product.price}</td>
              <td>
                <button className="btn btn-danger ml-5">Delete</button>
              </td>
            </th>
          </Table>
        </h4>
      ))}
    </div>
  );
};

export default ManageProduct;
