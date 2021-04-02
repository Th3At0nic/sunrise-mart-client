import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      weight: data.weight,
      price: data.price,
      imageURL: imageURL,
    };

    // console.log(imageURL);
    const url = `http://localhost:5009/addProduct`;
    // console.log(productData);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => console.log("server side response", res));

    clearFormInput();
  };

  const clearFormInput = () => {
    document.getElementById("name").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "9a1d46d2dee76e9ffcafcc13d7c2fbde");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        console.log(response.data.data.display_url);
        setImageURL(response.data.data.display_url);
        // console.log(imageURL);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-2"
          id="name"
          name="name"
          defaultValue="your product name"
          placeholder="Product name"
          ref={register}
        />{" "}
        <br />
        <input
          className="mb-2"
          id="weight"
          name="weight"
          //   defaultValue="1-KG"
          placeholder="Quantity"
          ref={register}
        />{" "}
        <br />
        <input
          className="mb-2"
          id="price"
          name="price"
          //   defaultValue=""
          placeholder="Price"
          ref={register}
        />{" "}
        <br />
        <input
          className="mb-2"
          name="imageURL"
          id="image"
          type="file"
          onChange={handleImageUpload}
        />{" "}
        <br />
        <input className="btn btn-success" type="submit" />
      </form>
    </div>
  );
};

export default AddProduct;
