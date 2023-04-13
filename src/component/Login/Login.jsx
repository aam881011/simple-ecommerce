import React, { useState } from "react";
import './Login.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
  
export default function Login() {
  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendLoginDataToApi() {
    let { data } = await axios.post(
      // `https://route-egypt-api.herokuapp.com/signin`,
      `https://reqres.in/api/login`,
      user
    );

    if (data.message == "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);

      navigate("/home");
    } else {
      setisLoading(false);
      setError(data.message);
    }
  }

  // async function sendLoginDataToApi() {
  //   let { data } = await axios.post(
  //     // `https://route-egypt-api.herokuapp.com/signin`,
  //     `https://reqres.in/api/login`,
  //     user
  //   ).then(response => {
  //     const { data } = response;
  //     setisLoading(false);
  //     localStorage.setItem("userToken", data.token);
  //     navigate("/home");
  //   })
  //   // .catch(err = > {

  //   // }
  //   // );

  //   if (data.message == "success") {
      

      
  //   } else {
      
  //   }
  // }

  function submitLoginForm(e) {
    e.preventDefault();
    setisLoading(true);
    // sendLoginDataToApi();
    let validation = validateLoginForm();

    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else {
      sendLoginDataToApi();
    }
  }

  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string(),
      // .pattern(/^[A-Z][a-z]{3,6}/)
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <div className="container">
      {errorList.map((err, index) => {
        if (err.context.label === "password") {
          return (
            <div key={index} className="alert alert-danger my-2">
              Password invalid
            </div>
          );
        } else {
          return (
            <div key={index} className="alert alert-danger my-2">
              {err.message}
            </div>
          );
        }
      })}

      {error.length > 0 ? (
        <div className="alert alert-danger my-2">{error}</div>
      ) : (
        ""
      )}

      <form onSubmit={submitLoginForm}>
        <label htmlFor="email">email :</label>
        <input
          onChange={getUserData}
          type="email"
          className="form-control my-input my-2"
          name="email"
          id="email"
        />
        <label htmlFor="password">password :</label>
        <input
          onChange={getUserData}
          type="password"
          className="form-control my-input my-2"
          name="password"
          id="password"
        />
        <button type="submit" className="btn btn-info">
          {isLoading == true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
