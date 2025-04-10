import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RFPCreation.css"

const RfpDetails = () => {
  const location = useLocation();
  const categoryId = location.state.category;

  const [rfpData, setRfpData] = useState({
    itemName: "",
    itemDescription: "",
    itemQuantity: "",
    lastDate: "",
    minimumPrice: "",
    maximumPrice: "",
  });

  const [vendors, setVendors] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
      navigate("/")
    }
    const fetchVendors = async () => {
      if (!category) return;

      try {
        const response = await fetch(
          `https://rfp-backend-wxmu.onrender.com/api/v1/getVendorsById?categoryId=${categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    const fetchCategories = async () => {
      const response = await fetch(
       `https://rfp-backend-wxmu.onrender.com/api/v1/getCategoryById/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCategory(data.category.name);
    };

    fetchCategories();
    fetchVendors();
  }, [category]);

  const handleChange = (e) => {
    setRfpData({ ...rfpData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleVendorSelection = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedVendors(selectedOptions);
    setErrors({ ...errors, selectedVendors: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rfpPayload = {
      ...rfpData,
      categoryId,
      selectedVendors,
    };

    try {
      const response = await fetch(`https://rfp-backend-wxmu.onrender.com/api/v1/submitRfp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rfpPayload),
      });

      const data = await response.json();
      console.log(data);
      if (data.response === "success") {
        alert("RFP submitted successfully!");
      } else {
        setErrors(data.errors)
      }
    } catch (error) {
      console.error("Error submitting RFP:", error);
      alert("Error submitting RFP. Please try again later.");
    }
  };

  return (
    <div className="rfp-container">
      <h2>Submit RFP for {category}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="rfp-container-category">
          <label>Item Name*</label>
          
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            onChange={handleChange}
          /><div className="rfp-container-category-input">
          {errors.itemName && <p className="error">{errors.itemName}</p>}
          </div>
        </div>
        <div className="rfp-container-category">
          {" "}
          <label>Item Description*</label>
          
          <input
            type="text"
            name="itemDescription"
            placeholder="Item Description"
            onChange={handleChange}
          />
          <div className="rfp-container-category-input">
          {errors.itemDescription && (
            <p className="error">{errors.itemDescription}</p>
          )}
          </div>
        </div>

        <div className="rfp-container-category">
          <label>Quantity*</label>
          
          <input
            type="number"
            name="itemQuantity"
            placeholder="Quantity"
            onChange={handleChange}
          /><div className="rfp-container-category-input">
          {errors.itemQuantity && (
            <p className="error">{errors.itemQuantity}</p>
          )}
          </div>
        </div>
        <div className="rfp-container-category">
          <label>Last Date*</label>
          
          <input type="date" name="lastDate" className="lastDate" onChange={handleChange} />
          <div className="rfp-container-category-input">
          {errors.lastDate && <p className="error">{errors.lastDate}</p>}
          </div>
        </div>
        <div className="rfp-container-category">
          <label>Minimum Price*</label>
          
          <input
            type="number"
            name="minimumPrice"
            placeholder="Minimum Price"
            onChange={handleChange}
          /><div className="rfp-container-category-input">
          {errors.minimumPrice && (
            <p className="error">{errors.minimumPrice}</p>
          )}
          </div>
        </div>
        <div className="rfp-container-category">
          <label>Maximum Price*</label>
          
          <input
            type="number"
            name="maximumPrice"
            placeholder="Maximum Price"
            onChange={handleChange}
          /><div className="rfp-container-category-input">
          {errors.maximumPrice && (
            <p className="error">{errors.maximumPrice}</p>
          )}
          </div>
        </div>
        <h3>Vendors Matching Category: {category}</h3>
        <div className="Vendors"><label>Select Vendors</label>
        <select multiple onChange={handleVendorSelection}>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.firstName} {vendor.lastName}
              </option>
            ))
          ) : (
            <option disabled>No vendors available</option>
          )}
        </select>
        </div>
        <div className="rfp-container-category-input">
        {errors.selectedVendors && (
          <p className="error">{errors.selectedVendors}</p>
        )}</div>

        <div className="submit-btn"><button type="submit">Submit</button></div>
      </form>
    </div>
  );
};

export default RfpDetails;
