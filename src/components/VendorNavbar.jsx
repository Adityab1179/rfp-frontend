import Logo from "../assets/images/velocity_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
const VendorNavbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Velocity Logo"></img>
      </div>
      <div className="nav-items">
        <Link to={"/vendor/dashboard"}>
          <div className="nav-category">
            <FontAwesomeIcon icon={faBook} />
            Dashboard
          </div>
        </Link>
        <Link to={"/vendor/rfpqueries"}>
          <div className="nav-category">
            <FontAwesomeIcon icon={faBook} />
           RFP For Queries
          </div>
        </Link>
      </div>
    </div>
  );
};
export default VendorNavbar;
