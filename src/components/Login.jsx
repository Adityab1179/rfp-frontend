import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://rfp-backend-wxmu.onrender.com/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.response === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "Admin") {
          navigate("/admin");
        } else if (data.role === "Vendor") {
          navigate("/vendor");
        }
      } else {
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErrorMessage(["Internal Server Error. Please try again later."]);
    }
  };

  return (
    <div className="login-container-outer">
      <div className="login-container-inner">
        <div className="login-header">
          <h3>Welcome to RFP System!</h3>
          <h4>Sign in to Continue</h4>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="login-form">
            <label htmlFor="email">Email*:</label>
            <input style={{width: "100%"}}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password*:</label>
            <input style={{width: "100%"}}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button">
              Log in
            </button>

            {errorMessage.length > 0 && (
              <div className="error-messages">
                {errorMessage.map((err, index) => (
                  <span key={index} className="error-span">
                    {err}
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>
        <div className="vendor-register-btn">
          <Link to={"/registeradmin"}>
            <p>Register as Admin</p>
          </Link>
          <Link to={"/resetpassword"}>
            <p>Forgot Your Password</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
