import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const revealPass = () => {
    const x = document.querySelector("#exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <Layout title="Rutu.com | Login">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
            <div className=" d-flex flex-column">
              <div className="">
                <input type="checkbox" onClick={revealPass} />
                <span style={{ marginLeft: "0.5rem", fontSize: "15px" }}>
                  show Password
                </span>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <NavLink
                  to={"/forgot-pass"}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Forgot 
                  <span style={{ color: "blue" }}> Password</span>?
                </NavLink>
              </div>
            </div>
          <button type="submit" className="btn btn-primary mt-3">
            LOGIN
          </button>
          <div className="d-flex justify-content-center mt-3">
            <NavLink
              to={"/register"}
              style={{ color: "black", textDecoration: "none" }}
            >
              Don't have an account?<span style={{ color: "blue" }}> SignUp</span>
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
