import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Error";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Header2 from "../components/Header2";
import { padding } from "@mui/system";
import { search } from "../redux/userSlice";
import { followApi } from "../redux/userSlice";
import { unfollowApi } from "../redux/userSlice";

import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  window.scrollTo(0, 0);

  const loading = useSelector((state) => state.usersReducer.loading);
  const error = useSelector((state) => state.usersReducer.error);
  const msg = useSelector((state) => state.usersReducer.message);
  const searchRedux = useSelector((state) => state.usersReducer.searchData);

  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const checkForRerender = useSelector(
    (state) => state.usersReducer.reRenderSearchApi
  );

  useEffect(() => {
    setKeyword("");
  }, []);

  useEffect(() => {
    if (checkForRerender) {
      dispatch(search({ keyword }));
    }
  }, [checkForRerender]);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.length > 0) {
      dispatch(search({ keyword }));
    } else {
      toast.error("Please enter keyword!");
    }
  };

  return (
    <>
      <Header2 />
      <ToastContainer autoClose={2000} theme="dark" />
      <hr style={{border:"10px solid red"}}/>
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "2%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          
        }}
      >
        <div>
          <br/>
          <br/>
          <br/>
          <h1 style={{fontWeight:"bolder", color:"white"}}>
            {"Welcome "+userData?.fullName}
          </h1>
        </div>

        <hr style={{border:"100px"}}></hr>

        <div className="col-md-6 col-8 d-flex align-items-center">
          <form onSubmit={submitHandler} className="input-group">
            <input
              type="search"
              className="form-control rounded search"
              placeholder="Search"
              defaultValue={""}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="search-button" style={{backgroundColor:"#050582", fontWeight:"bolder"}}>
              search
            </button>
          </form>
        </div>

        {loading && <Loading />}

        {searchRedux && searchRedux.length > 0 ? (
          <div className=" alert alert-light text-center mt-3 ">
            Search Results
          </div>
        ) : null}

        {searchRedux && searchRedux.length > 0
          ? searchRedux.map((item) => {
              return item._id == userData.id ? null : (
                <>
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#E7E7E7",
                      margin: "5px",
                      padding: "15px 25px",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.fullName}

                    {item.followers.includes(userData.id) ? (
                      <button
                        style={{
                          backgroundColor: "#1773EA",
                          borderRadius: "5px",
                          color: "white",
                          width: "90px",
                        }}
                        onClick={() =>
                          dispatch(
                            unfollowApi({ myId: userData.id, id: item._id })
                          )
                        }
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#1773EA",
                          borderRadius: "5px",
                          color: "white",
                          width: "90px",
                        }}
                        onClick={() =>
                          dispatch(
                            followApi({ myId: userData.id, id: item._id })
                          )
                        }
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </>
              );
            })
          : null}
      </div>
    </>
  );
};
