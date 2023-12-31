import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onLogin(e) {
    e?.preventDefault();
    if (!(email.length && password.length)) {
      window.alert("Please fill all details.");
      return;
    }

    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/user/login`,
      headers: {
        "Content-Type": "application/json",
      }, 
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <form className="login-form">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="text-center">
          <p>
          <a href="/user/forgotPassword">Forgot Password?</a>
          </p>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={onLogin}>
            Sign in
          </button>
        </div>
        <div class="text-center">
          <p>
            Not a member? <a href="/signup">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
}
