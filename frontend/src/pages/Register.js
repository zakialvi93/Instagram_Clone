import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Error";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { register } from "../redux/userSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header1 from "../components/Header1";

export const Register = () => {
  const dispatch = useDispatch();

  window.scrollTo(0, 0);
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.usersReducer.loading);
  const error = useSelector((state) => state.usersReducer.error);
  const msg = useSelector((state) => state.usersReducer.message);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ fullName, email, password }));
    
  };

  return (
    <>
      <Header1/>
      <ToastContainer autoClose={2000} theme="dark" />

      <div style={{ paddingTop: "35px", paddingBottom: "2%" }}>
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
          {error && <Message variant="alert-danger">{msg}</Message>}
          
          {loading && <Loading />}

          <form
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >

              <img 
                  alt="logo"
                  src="/images/logo.png"
                  style={{
                    width: "140px",
                    objectFit: "contain",
                    padding: "10px 0px"
                  }}
              />

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" style={{backgroundColor:"#1773EA", fontWeight:"bold"}}>Sign Up</button>
            <p>
              
                Already have an account? 
                <Link to={"/login"}>
                <strong> Sign In</strong>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
