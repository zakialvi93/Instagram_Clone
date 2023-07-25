import React from "react";
import { Link } from "react-router-dom";


export const NoPage = () => {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "2%" }}>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h1 className="text-center mb-2 mb-sm-5" style={{color:"white", fontWeight:"bolder"}}>Page Not Found</h1>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/no_page.png"
            alt="Not-found"
          />
          
        </div>
      </div>
    </div>
  );
};
