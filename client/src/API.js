import axios from "axios";

const baseURL = "http://localhost:3001";

const handleLogin = (email, password) => {
  return axios.post(`${baseURL}/auth/login`, {
    email,
    password,
  });
};

const handleRegister = (name, email, password) => {
  return axios.post(`${baseURL}/auth/register`, {
    name,
    email,
    password,
  });
};

export { handleLogin, handleRegister };
