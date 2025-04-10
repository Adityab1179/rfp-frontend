import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SignUpVendor.css";

const SignUpVendor = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    revenue: "",
    noOfEmployees: "",
    GSTNo: "",
    PANNo: "",
    phoneNo: "",
    category: [],
  });

  useEffect(() => {
    fetch(`https://rfp-backend-wxmu.onrender.com/api/v1/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.categories?.length === 0) {
          setErrors("No categories available. Please contact the admin.");
        } else {
          setCategories(data.categories);
        }
        setLoading(false);
      })
      .catch(() => {
        setErrors("Failed to load categories.");
        setLoading(false);
      });
  }, []);
  const handleCategoryChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(selectedValues);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedValues,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch(`https://rfp-backend-wxmu.onrender.com/api/v1/registervendor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.response === "success") {
        navigate("/");
      } else {
        setErrors(data.errors);
      }
    } catch (err) {
      setErrors({ form: "Failed to connect to the server. Please try again." });
    }
  };

  return (
    <div className="login-container-outer">
      <div className="login-container-inner">
        <div className="login-header">
          <h3>Welcome to RFP System!</h3>
          <h4>Register as Vendor</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="login-2">
              <div className="login-2-group">
                <label>First name*:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                {errors.firstName && <span className="error-span">{errors.firstName}</span>}
              </div>
              <div className="login-2-group">
                <label>Last name*:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                {errors.lastName && <span className="error-span">{errors.lastName}</span>}
              </div>
            </div>

            <div className="login-1">
              <label>Email*:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <span className="error-span">{errors.email}</span>}
            </div>

            <div className="login-2">
              <div className="login-2-group">
                <label>Password*:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                {errors.password && <span className="error-span">{errors.password}</span>}
              </div>
              <div className="login-2-group">
                <label>Confirm Password*:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <span className="error-span">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="login-2">
              <div className="login-2-group">
                <label>Revenue (Last 3 Years in Lakhs)*:</label>
                <input type="text" name="revenue" value={formData.revenue} onChange={handleChange} required />
                {errors.revenue && <span className="error-span">{errors.revenue}</span>}
              </div>
              <div className="login-2-group">
                <label>No of Employees*:</label>
                <input type="text" name="noOfEmployees" value={formData.noOfEmployees} onChange={handleChange} required />
                {errors.noOfEmployees && <span className="error-span">{errors.noOfEmployees}</span>}
              </div>
            </div>

            <div className="login-2">
              <div className="login-2-group">
                <label>GST No*:</label>
                <input type="text" name="GSTNo" value={formData.GSTNo} onChange={handleChange} required />
                {errors.GSTNo && <span className="error-span">{errors.GSTNo}</span>}
              </div>
              <div className="login-2-group">
                <label>PAN No*:</label>
                <input type="text" name="PANNo" value={formData.PANNo} onChange={handleChange} required />
                {errors.PANNo && <span className="error-span">{errors.PANNo}</span>}
              </div>
            </div>

            <div className="login-2">
              <div className="login-2-group">
                <label>Phone No*:</label>
                <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
                {errors.phoneNo && <span className="error-span">{errors.phoneNo}</span>}
              </div>
              <div className="login-2-group">
                <label>Categories*</label>
                <select className="categories" multiple name="category" onChange={handleCategoryChange} value={formData.category}>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="error-span">{errors.category}</span>}
              </div>
            </div>

            {errors.form && <span className="error-span">{errors.form}</span>}
            <div style={{display:'flex', justifyContent:"center"}}>
            <button type="submit" className="login-button">
              Register
            </button></div>
          </div>
        </form>

        <div className="vendor-register-btn">
          <Link to="/">
            <p>Already have an account? <span style={{color:"blue"}}>Login</span></p>
          </Link>
          <Link to="/resetpassword">
            <p>Forgot Your Password</p>
          </Link>
        </div>
      </div>
      <p>© Copyright ❤️ RFP System</p>
    </div>
  );
};

export default SignUpVendor;
