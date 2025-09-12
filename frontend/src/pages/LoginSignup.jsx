import React, { useContext } from "react";
import "../Style/Loginsignup.css";
import { useState } from "react";
import { AuthContext } from "../context/Authcontext";

const LoginSignup = () => {
  const { login: contextLogin } = useContext(AuthContext);
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("login function executed", formData);
    let responseData;
    await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/from-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("auth-user", JSON.stringify(responseData.user));
      contextLogin(responseData);
      if (responseData.user.isAdmin === true) {
        window.location.replace("/admin");
      } else {
        window.location.replace("/");
      }
    } else {
      alert(responseData.errors);
    }
  };

  const SignUp = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:7000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/from-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,i agree to the terms of use & privacy policy.</p>
        </div>
        <button
          onClick={() => {
            state === "login" ? handleLogin() : SignUp();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span
              onClick={() => {
                setState("login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
