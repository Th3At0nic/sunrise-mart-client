import React from "react";

const Products = ({ product }) => {
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
          <button className="btn btn-success">Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
