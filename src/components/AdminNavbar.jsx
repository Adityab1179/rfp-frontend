import Logo from "../assets/images/velocity_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faReceipt,
  faShop,
  faGripVertical,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="Velocity Logo"></img>
      </div>
      <div className="nav-items">
      <Link to={"/admin"}>
          <div className="nav-category">
            <FontAwesomeIcon icon={faBook} />
            Dashboard
          </div>
          </Link>
          <Link to={"/admin/dashboard"}>
        <div className="nav-category">
          <FontAwesomeIcon icon={faReceipt} />
          Vendors
        </div>
        </Link>
        <Link to={"/admin/rfpview"}>
          <div className="nav-category">
            <FontAwesomeIcon icon={faShop} />
            RFP List
          </div>
        </Link>
        <Link to={"/admin/categories"}>
        <div className="nav-category">
          <FontAwesomeIcon icon={faGripVertical} />
          Categories
        </div>
        </Link>
        <Link to={"/admin/rfpcreation"}>
          <div className="nav-category">
            <FontAwesomeIcon icon={faMoon} />
            RFP Creation
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
