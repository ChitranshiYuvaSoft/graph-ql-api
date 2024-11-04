import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/auth/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userInfo));
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder=" "
              value={email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder=" "
              value={password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
