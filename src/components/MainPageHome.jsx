import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPageHome.css";
const MainPageHome = () => {
  const token=localStorage.getItem("token");
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  },[])
  return (
    <div className="main-page-home">
      <div className="main-page-home-header">
        <h4>Dashboard</h4>
        <p>Home</p>
      </div>
      <div className="main-page-home-content">
        <div className="main-page-home-content-header">
          <p>Welcome to RFP System</p>
        </div>
        <div>
            <div className="main-page-footer">
                <p>2022 © Copyright.</p>
                <p>Support Email: support@velsof.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};
export default MainPageHome;
