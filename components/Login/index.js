import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import bookMovie from "../../images/bookMovies.png";
import "./Login.css";

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({ state: "active" });
  console.log('props',props);
  const history = useHistory();
  async function fetchUser(e) {
    e.preventDefault();
    const url = `http://localhost:3000/log_in/${userDetails.email}/${userDetails.password}/${userDetails.state}`;
    let response = await fetch(url);
    response = await response.json();

    console.log("response", response);
    if (response.status === 200) {
      
      props.setUser({email:userDetails.email,isAdmin:response.isAdmin});
      history.push("/movies");
    }
  }

  return (
    <div className="d-flex flex-row">
      <div className="w-50">
        <img className="m-4 p-3" src={bookMovie}></img>
      </div>
      <div className="Card" style={{ marginTop: "10em" }}>
        <form onSubmit={(e) => fetchUser(e)}>
          <div className="ml-2">
            Email
            <input
              className="ml-5 mb-4 mt-4"
              type="email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            ></input>
          </div>
          <div className="ml-2">
            Password
            <input
              className="ml-3 mb-3"
              type="password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              required
            ></input>
          </div>
          <div>
            <button type="submit" className="btn btn-success mb-4">
              Login
            </button>
          </div>
        </form>
        <small>If you are new user, please click to </small>
        <button type="button" className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
