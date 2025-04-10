import Navbar from "./VendorNavbar";
import { Routes, Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainPageHome from "./MainPageHome";
import "./AdminDashboard.css";
import RFPView from "./RFPView";

const AdminDashboard = () => {
  const navigate=useNavigate();
  useEffect(() => {
      document.title = "ASSAM FLOOD";
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
  
      if (!token || role !== "Vendor") {
        navigate("/");
      }
    }, [navigate]);

  return (
    <div className="admin-dashboard-container">
      <Navbar />
      <div className="main-area">
        <div className="header">
          <div className="header-content">
            <p className="Welcom-text">Welcome</p>
            <p className="Logout-btn">Logout</p>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<MainPageHome />} />
          <Route path="/rfpqueries" element={<RFPView />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
