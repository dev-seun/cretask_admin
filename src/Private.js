import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./site/header";
import { hideShow, navMenu } from "./static/constant/constant";

function PrivateRoutes() {
  let isLogin = localStorage.getItem("tkopen");
  let navigate = useNavigate();
  function goto(link) {
    console.log("first", window.screen.availWidth);
    if (window.screen.availWidth < 800) {
      hideShow();
    }
    navigate(link);
  }
  return (
    <>
      {isLogin !== null && isLogin !== undefined ? (
        <>
          <div className="home">
            <nav className="show" id="navbar">
              <img src="cretask.png" alt="" width={"100%"} height="70px" />
              <div>
                <ul>
                  {navMenu.map((e) => {
                    return (
                      <li onClick={() => goto(e.link)} key={e.name}>
                        {e.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
            <main>
              <div className="row">
                <div className="col-lg-12">
                  <div className="main">
                    <Header />
                    <Outlet />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
