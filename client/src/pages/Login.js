import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../JS/userSlice";
import { Link } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.error);

const handleSignIn = (e) => {
  e.preventDefault();
  dispatch(loginUser({userName, password}));
  setUserName("")
  setPassword("")
};

  return (
    <div>
      <form className="my-2 mx-auto w-25">
        <div class="mb-3">
          <label htmlFor="exampleInputUserName1" class="form-label">
            UserName
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputUserName1"
            aria-describedby="usernameHelp"
            onChange={(e) => {
              setUserName(e.target.value)}}
            value={userName}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div class="form-text mb-3">
          If you don't have an account
          <Link to="/api/auth/register" className="ms-1">
            Register
          </Link>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSignIn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
