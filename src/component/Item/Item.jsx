import React from "react";
import './Item.scss'
import { Link } from "react-router-dom";

export default function Item(props) {
  // let {ftitle, poster_path, overview, vote_average}=props.data

  const { product } = props;

  return (
    <>
      {/* <div className="col-md-2"> */}
      {/* <img className='w-100' src={ `https://image.tmdb.org/t/p/w500${poster_path}` } alt="" /> */}

      <div className="itemContent">
        <div className="item position-relative">
          <img className="" src={product.image} alt="" />
          <Link to={`/details/${product.id}`}>
            <div className="overlay d-flex align-items-center text-center">
              <p>{product.description.split(" ").slice(0, 10).join(" ")}</p>
            </div>
          </Link>
        </div>
        <h6>{product.title.split(" ").slice(0, 5).join(" ")}</h6>
        <h5 className="text-info">{product.price} $</h5>
      </div>

      {/* </div> */}
    </>
  );
}
