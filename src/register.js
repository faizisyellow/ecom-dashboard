import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  }, [navigate]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function signUp() {
    let item = { name, password, email };
    console.warn(item);
    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    result = await result.json();
    console.warn("result", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <h1>Halaman register</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control mb-sm-4" placeholder="Name" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-sm-4" placeholder="Password" />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-sm-4" placeholder="Email" />
        <button onClick={signUp} className="btn-primary rounded p-2 px-3">
          Sign Up
        </button>
      </div>
    </>
  );
}
export default Register;
