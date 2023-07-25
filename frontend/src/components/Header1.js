import React from "react";
import { Link } from "react-router-dom";



const Header1 = () => {
  return (
    <div class="m-4">
      <nav
        class="navbar navbar-expand-sm fixed-top navbar-light"
        style={{
          backgroundColor: "#E7E7E7",
          WebkitBorderBottomRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          paddingLeft: "15px",
          paddingRight: "15px"
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
                        <Link to="/register" style={{fontSize:"20px", fontWeight:"bolder"}}>
                          Sign Up
                        </Link>
                      </li>
                      
                      <li style={{padding:"12px"}}>
                        <Link to="/login" style={{fontSize:"20px", fontWeight:"bolder"}}>
                          Sign In
                        </Link>
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


export default Header1;
