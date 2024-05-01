import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || token === "" || token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <Outlet />;
}

export default Home;
