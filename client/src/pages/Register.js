import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../JS/userSlice";


const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const handleSignUp = (e) => {
      e.preventDefault();
      dispatch(registerUser({ userName, password, confirmPassword }));
      setUserName("");
      setPassword("");
      setConfirmPassword("")
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
              setUserName(e.target.value);
            }}
            value={userName}
          />
          <div id="usernameHelp" class="form-text">
            We'll never share your username with anyone else.
          </div>
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
        <div class="mb-3">
          <label htmlFor="exampleInputPassword2" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword2"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </div>
        <div class="form-text mb-3">
          You already have a account
          <Link to="/api/auth/login" className="ms-1">
            Log In
          </Link>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSignUp}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register