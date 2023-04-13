import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
 
export default function Register() {
  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendRegisterDataToApi() {
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );

    if (data.message == "success") {
      setisLoading(false);
      navigate("/login");
    } else {
      setisLoading(false);
      setError(data.message);
    }
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    setisLoading(true);
    // sendRegisterDataToApi();
    let validation = validateRegisterForm();

    if (validation.error) {
      setisLoading(false);

      // seterrorList();
      seterrorList(validation.error.details);
    } else {
      sendRegisterDataToApi();
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      first_name: Joi.string()
        .pattern(/^[A-Z]/)
        .min(3)
        .max(10)
        .required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
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
      <div className="container">
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">first_name :</label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control my-input my-2"
            name="first_name"
            id="first_name"
          />
          <label htmlFor="last_name">last_name :</label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control my-input my-2"
            name="last_name"
            id="last_name"
          />

          <label htmlFor="age">age :</label>
          <input
            onChange={getUserData}
            type="number"
            className="form-control my-input my-2"
            name="age"
            id="age"
          />
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
