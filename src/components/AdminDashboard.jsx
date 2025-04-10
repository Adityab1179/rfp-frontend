import Navbar from "./AdminNavbar";
import { Routes, Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainPageHome from "./MainPageHome";
import Dashboard from "./Dashboard";
import "./AdminDashboard.css";
import RFPCreationDashboard from "./RFPCreationDashboard";
import RFPCreation from "./RFPCreation";
import RFPView from"./RFPView"
import Categories from "./Categories";

const AdminDashboard = () => {
  const navigate=useNavigate();
  useEffect(() => {
    document.title = "ASSAM FLOOD";
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Admin") {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    sessionStorage.removeItem("token"); 
    sessionStorage.removeItem("role"); 
    navigate("/"); 
  };
  

  return (
    <div className="admin-dashboard-container">
      <Navbar />
      <div className="main-area">
        <div className="header">
          <div className="header-content">
            <p className="Welcom-text">Welcome</p>
            <p className="Logout-btn" onClick={handleLogout}>Logout</p>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<MainPageHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rfpcreation" element={<RFPCreationDashboard/>} />
          <Route path="/rfpdetails" element={<RFPCreation/>} />
          <Route path="/rfpview" element={<RFPView/>} />
          <Route path="/categories"element={<Categories/>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
