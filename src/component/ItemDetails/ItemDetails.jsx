import React from "react";
import "./ItemDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
 
export default function ItemDetails() {
  const api_url = "https://fakestoreapi.com/products";
  const [product, setProduct] = useState({});
  const params = useParams();
  // console.log(params);
  useEffect(() => {
    axios
      .get(`${api_url}/${params.detailsId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      {/* ItemDetails */}
      {/* <h1>ItemDetails- {product.title} {params.detailsId}</h1> */}
      {/* <Item product={product} /> */}
      {/* <Link to='http://localhost:3000/home'>Back</Link> */}
      <div className="itemDetails">
        <div className="contDetails">
          <img className="imgDetails" src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price} $</h5>
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
