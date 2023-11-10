import axios from "axios";
import { useState } from "react";

export default function Forgotpassword(){
    const [email, setEmail] = useState("");
    function resetPassword(){
        let data = JSON.stringify({
            email
          });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3001/user/password/forgotpassword",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };
      
          axios
            .request(config)
            .then((response) => {
              alert(response.data.message);

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
           
            <div className="col-12">
              <button className="btn btn-primary" onClick={resetPassword}>
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      );
}