import { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [data,setData]=useState([])
  const token=sessionStorage.getItem("token")

  useEffect(() => {
    
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch(`https://rfp-backend-wxmu.onrender.com/api/v1/listvendors`);
      const data = await response.json();
      setVendors(data.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };
  const toggleVendorStatus = async (vendorId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
  
      const response = await fetch(
        `https://rfp-backend-wxmu.onrender.com/api/v1/updatevendorstatus/${vendorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
  
      const result = await response.json();
      if (result.response === "success") {
        fetchVendors();
      } else {
        console.error("Error updating vendor status:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="main-page-home">
      <div className="main-page-home-header">
        <h4>Vendors List</h4>
        <p>Home / Vendors</p>
      </div>
      <div className="main-page-home-content">
        <div className="main-page-home-content-header">
          <h4>Vendors</h4>

          <table>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>{index + 1}</td>
                  <td>{vendor.firstName}</td>
                  <td>{vendor.lastName}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phoneNo}</td>
                  <td>{vendor.status}</td>
                  <td>
                    <button
                      className={`status-btn ${vendor.status === "Active" ? "active" : "inactive"}`}
                      onClick={() => toggleVendorStatus(vendor._id, vendor.status)}
                    >
                      {vendor.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
