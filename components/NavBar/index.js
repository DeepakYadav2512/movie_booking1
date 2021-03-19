import React from "react";
import logo from "../../images/bookMyShow.jpeg";

const NavBar = (props) => {
  return (
    <div
      className="d-flex fex-row justify-content-between"
      style={{ background: "rgb(51, 53, 69)", height: "100px" }}
    >
      <img className="mt-2 ml-4" src={logo} alt="book my show" height="75px" />
      <div className="mr-5">
        <button
          className="mt-4"
          onClick={() =>
            props.history.push({
              pathname: "/movies",
            })
          }
        >
          Movies
        </button>
        {props.user && props.user.isAdmin ? (
          <div>
            <button
              className="mt-4 ml-2"
              onClick={() =>
                props.history.push({
                  pathname: "/theatres",
                })
              }
            >
              Theaters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
