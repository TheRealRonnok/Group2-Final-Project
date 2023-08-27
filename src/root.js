import React, { useState, useEffect } from "react";

import {
  Outlet,
  UNSAFE_DataRouterStateContext,
  useNavigate,
} from "react-router-dom";
import { Navbar } from "./components";

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  // check for token in local storage
  const checkLocalStorage = () => {
    const checkToken = localStorage.getItem("token");
    const checkUser = localStorage.getItem("user");
    if (checkToken && checkUser) {
      console.log(checkUser, checkToken);
      setToken(checkToken);
      setUser(checkUser);
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkLocalStorage();
  });

  return (
    <>
      <Navbar
        //props to be able to change login button to logout button, and clear user state
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
        setUser={setUser}
      />
      <div>
        <Outlet
          //props to be shared between outlet routes
          context={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            token,
            setToken,
            checkLocalStorage,
          }}
        />
      </div>
    </>
  );
};

export default Root;
