import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  // console.log(product._id);

  const checkOut = (id) => {
    console.log(id);
    // const orderData = { ...product };
    // console.log(orderData);
  };

  return (
    <div className="col-md-3 m-3 p-2 container border border-success">
      <img style={{ height: "300px" }} src={product.imageURL} alt="" />
      <div className="mt-5">
        <h3>
          {product.name} {product.weight}
        </h3>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h1>৳{product.price}</h1>
        </div>
        <div className="col">
          <Link className="btn btn-success" to={"/checkOut/" + product._id}>
            Buy Now
          </Link>
          {/* <button onClick={() => checkOut(product)} className="btn btn-success">
            Buy now
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Products;
