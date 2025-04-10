import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignUpAdmin.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://rfp-backend-wxmu.onrender.com/api/v1/registeradmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.response === "success") {
        navigate("/");
      } else if (data.response === "error") {
        setErrors(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container-outer">
      <div className="login-container-inner">
        <div className="login-header">
          <h3>Welcome to RFP System!</h3>
          <h4>SignUp to Continue</h4>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name*:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter Firstname"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <label htmlFor="lastName">Last name*:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Lastname"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <label htmlFor="email">Email*:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password*:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="confirmPassword">Confirm Password*:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <div style={{display:'flex', justifyContent:"center"}}>
          <button type="submit">Register</button>
          </div>
        </form>

        <div className="vendor-register-btn">
          <Link to={"/registervendor"}>
            <p>Register as Vendor</p>
          </Link>
          <Link to="/">
            <p>
              Already have an account?{" "}
              <span style={{ color: "blue" }}>Login</span>
            </p>
          </Link>
          <Link to={"/resetpassword"}>
            <p>Forgot Your Password?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
