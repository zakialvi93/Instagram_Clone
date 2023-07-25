import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Error";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { login } from "../redux/userSlice";
import Header1 from "../components/Header1";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.scrollTo(0, 0);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.usersReducer.loading);
  const error = useSelector((state) => state.usersReducer.error);
  const msg = useSelector((state) => state.usersReducer.message);


  const checkNav = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const checkToNavigate = useSelector((state) => state.usersReducer.goToSearch);

  useEffect(() => {
    if (checkToNavigate && checkNav) {
      navigate("/");
    }
  }, [checkToNavigate, checkNav]);

  useEffect(() => {
    if (checkNav) {
      navigate("/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>

    <Header1/>
    <div style={{ paddingTop: "26px", paddingBottom: "2%" }}>
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
          <button type="submit" style={{backgroundColor:"#1773EA", fontWeight:"bold"}}>Sign In</button>
          <p>
            
            Don't have an account? 
              <Link to={"/register"}>
              <strong> Sign Up</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};
