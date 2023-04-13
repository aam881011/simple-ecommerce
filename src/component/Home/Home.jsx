import React from "react";
import "./Home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../Item/Item";
import Loading from "./../Loading/Loading";

export default function Home() {
  // const [Movies, setMovies] = useState([]);

  // let getTrending = async () => {
  //   let { data } = await axios.get(
  //     // `https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test`
  //     `https://fakestoreapi.com/products`
  //   );
  //   setMovies(data.results);
  // };

  // useEffect(() => {
  //   getTrending();
  // }, []);
  
  const api_url = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async () => {
    await axios
      .get(api_url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategories = async () => {
    await axios
      .get(`${api_url}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductCategory = async (catName) => {
    await axios
      .get(`${api_url}/Category/${catName}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <>
      {/* Home */}
      {/* <div className="row"> */}
      {/* {Movies.map((value, index) => (
          <Item key={index} data={value} />
        ))} */}

      <div className="container">
        <h2 className="text-center pt-5">Our Products</h2>
        <div className="buttons">
          <button
            className="btn btn-info"
            onClick={() => {
              getProducts();
            }}
          >
            All
          </button>
          {categories.map((cat) => {
            return (
              <button
                className="btn btn-info"
                key={cat}
                onClick={() => {
                  getProductCategory(cat);
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
        
        <div className="boxes">
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <div className="box" key={product.id}>
                  <Item product={product} />
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>

        {/* </div> */}
      </div>
    </>
  );
}
