import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../App";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSignup(e) {
    e?.preventDefault();
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
