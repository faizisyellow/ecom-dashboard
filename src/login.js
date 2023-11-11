import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/addProducts");
    }
  }, [navigate]);

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/addProducts");
  }
  return (
    <div>
      <Header />
      <h1> Login</h1>
      <div className="col-sm-6 offset-sm-3 mt-5">
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-4" />
        <button className="btn-primary rounded p-2 px-3" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
