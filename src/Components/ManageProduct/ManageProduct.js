import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5009/manageProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    console.log(id);
    fetch(`http://localhost:5009/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("deleted successfully", result);
      });
  };

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
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="btn btn-danger ml-5"
                >
                  Delete
                </button>
              </td>
            </th>
          </Table>
        </h4>
      ))}
    </div>
  );
};

export default ManageProduct;
