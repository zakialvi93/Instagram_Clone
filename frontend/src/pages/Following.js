import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Header2 from "../components/Header2";
import { getFollowing } from "../redux/userSlice";
import { unfollowApi } from "../redux/userSlice";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Following = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  window.scrollTo(0, 0);

  const loading = useSelector((state) => state.usersReducer.loading);
  

  const searchRedux = useSelector((state) => state.usersReducer.following);

  const checkNav = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  
  const checkForRerender = useSelector(
    (state) => state.usersReducer.reRenderSearchApi
  );

  const userData = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    if (checkForRerender) {
      dispatch(getFollowing({ id: userData?.id }));
    }
  }, [checkForRerender]);

  useEffect(() => {
    if (!checkNav) {
      navigate("/");
    } else {
      dispatch(getFollowing({ id: userData?.id }));
    }
  }, []);

  return (
    <>
      <Header2 />
      <ToastContainer autoClose={2000} theme="dark"/>

      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "2%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          
        }}
      >
        {loading && <Loading />}

        {searchRedux && searchRedux.length > 0 ? (
          <div className=" alert alert-light text-center mt-3 ">Following</div>
        ) : null}

        {searchRedux && searchRedux.length > 0 ? (
          searchRedux.map((item) => {
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

                  <button
                    style={{
                      backgroundColor: "#1773EA",
                      borderRadius: "5px",
                      color: "white",
                      width: "90px",
                    }}
                    onClick={() =>
                      dispatch(
                        unfollowApi({
                          myId: userData.id,
                          id: item._id,
                        })
                      )
                    }
                  >
                    Unfollow
                  </button>
                </div>
              </>
            );
          })
        ) : (
          <div className=" alert alert-light text-center mt-3 ">
            No Following
          </div>
        )}
      </div>
    </>
  );
};
