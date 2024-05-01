import "./login.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../../API.js";

function Login(message) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.email.trim() === "" || value.password.trim() === "") {
      alert("Please fill all the fields");
    } else {
      handleLogin(value.email, value.password)
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        })
        .catch((error) => {
          alert("ERROR: " + error.response.data.error);
        });
    }
    console.log(value);
  };
  return (
    <div className="body">
      <div className="container">
        <h1>Library Management</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              className="input"
              type="text"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Password</label>
            <input
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="input"
              type="password"
              required
            />
          </div>
          <button type={"submit"} className="button">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "lightblue" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
