import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import("./RFPCreationDashboard.css");
function RFPCreationDashboard() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/categories`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category");
      return;
    }
    navigate("/admin/rfpdetails", { state: { category } });
  };
  return (
    <div>
      <div className="main-page-home-content">
        <div className="main-page-home-content-header">
          <h3>Vendors</h3>
        </div>
        <form onSubmit={handleSubmit} className="category-form">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <div>
            {" "}
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RFPCreationDashboard;
