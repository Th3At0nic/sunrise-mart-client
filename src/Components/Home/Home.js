import React, { useEffect, useState } from "react";

import Products from "../Products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5009/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  console.log(products);

  return (
    <div className="row pl-5">
      {products.map((pd) => (
        <Products product={pd}></Products>
      ))}
    </div>
  );
};

export default Home;
