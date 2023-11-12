import { useState } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignup() {
    if (!(name.length && email.length && password.length)) {
      window.alert("Please fill all details.");
      return;
    }
    //Calling API's for signup
    let data = JSON.stringify({
      name,
      email,
      password,
    });

    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://friendly-goat-kerchief.cyclic.app/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        alert(response.data.message);
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch(API_BASE_URL + "/sign-up", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     password,
    //   }),
    // })
    //   .then((response) => {
    //     // window.alert("Welcome to our site! Please login to continue.");
    //     window.location.pathname = "/login";
    //   })
    //   .catch((err) => window.alert("Oops! Something went wrong!"));
  }

  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form className="login-form">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" onClick={onSignup}>
              Sign Up
            </button>
          </div>
          <div class="text-center">
            <p>
              Already a member? <a href="/user/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
