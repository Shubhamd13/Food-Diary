import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth,userInfo } from "../utils/AuthContext";

function Login() {
  const loginForm = useRef(null)
  const {user, loginUser,googleLogin} = useAuth();
  let navigate = useNavigate();
  useEffect(() => {
    if(user){
      navigate("/");
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value
    const userInfo = {email, password}

    loginUser(userInfo)
    
  };

  const onGoogleLogin = async (e) => {
    googleLogin();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 rounded">
      <h1 className="text-center mb-4">Food Diary</h1>
            <form onSubmit={handleSubmit} ref={loginForm} >
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                Login
              </button>
              </form>
              <button
                type="button"
                className="btn btn-light btn-block mt-3"
                onClick={onGoogleLogin}
              >
                Sign in with Google
              </button>
      </div>
    </div>
  );
}

export default Login;
