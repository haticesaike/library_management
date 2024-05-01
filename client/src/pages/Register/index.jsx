import "./register.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleRegister } from "../../API.js";

function Register() {
  const labels = document.querySelectorAll(".form-control label");
  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (letter, idx) =>
            `<span style="transition-delay:${idx * 50}ms">${letter}</span>`,
        )
        .join("");
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPassword) {
      alert("Passwords do not match");
    } else if (
      value.name.trim() === "" ||
      value.email.trim() === "" ||
      value.password.trim() === "" ||
      value.confirmPassword.trim() === ""
    ) {
      alert("Please fill all the fields");
    } else {
      handleRegister(value.name, value.email, value.password)
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
            <label className="label">Name</label>
            <input
              className="input"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              className="input"
              type="email"
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
          <div className="form-control">
            <label className="label">Confirm Password</label>
            <input
              value={value.confirmPassword}
              onChange={(e) =>
                setValue({ ...value, confirmPassword: e.target.value })
              }
              className="input"
              type="password"
              required
            />
          </div>
          <button type={"submit"} className="button">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "lightblue" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
