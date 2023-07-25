import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header2 = () => {
  
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div class="m-4">
      <nav
        class="navbar navbar-expand-sm fixed-top navbar-light"
        style={{
          backgroundColor: "#E7E7E7",
          WebkitBorderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          paddingLeft: "15px",
          paddingRight: "15px",
          
        }}
      >

        
        <div class="container-fluid">
          
            <img
              style={{
                width: "80px",
                justifyContent: "center",
              }}
              alt="logo"
              src="/images/logo.png"
            />
          

          

          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarCollapse"
          >
            <div class="nav ml-auto justify-content-end">
              <div class="navbar-nav">
                <>
                  <div class="nav-item dropdown ml-auto justify-content-end" style={{display:'flex'}}>
                    <ul style={{display:"flex", listStyleType:"none", alignItems:"baseline"}}>
                    
                      <li style={{padding:"12px"}}>
                        <Link to="/" style={{fontSize:"20px", fontWeight:"bolder"}}>
                          Search
                        </Link>
                      </li>
                      
                      <li style={{padding:"12px"}}>
                        <Link to="/followers" style={{fontSize:"20px", fontWeight:"bolder"}}>
                          Followers
                        </Link>
                      </li>
                      <li style={{padding:"12px"}}>
                        <Link to="/following" style={{fontSize:"20px", fontWeight:"bolder"}}>
                          Following
                        </Link>
                      </li>
                      <li style={{padding:"12px"}}>
                        <button onClick={logoutHandler}
                          style={{
                            cursor: "pointer",
                            fontWeight: "bolder",
                            padding: "13px 25px",
                            fontSize: "0.8rem",
                            border: "none",
                            color: "white",
                            background:"#db183c",
                            borderRadius: "15px",
                            marginLeft: "20px",
                            transition: "all 0.25s ease",
                          }}
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>

                    

                    

                    


                    

                  </div>
                  
                </>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header2;
