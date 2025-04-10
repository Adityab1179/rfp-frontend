import "./ForgotPassword.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <div className="login-container-outer">
      <div className="login-container-inner">
        <div className="login-header">
          <h3>Welcome to RFP System!</h3>
          <h4>SignUp to Continue</h4>
        </div>
        <div className="forgot-password-form">
        <label htmlFor="email">Email*:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            required
          />
          <button type="submit">Send OTP</button>
          </div>
          <div className="vendor-register-btn">
          
          <Link to={"/registervendor"}><p>Register as Vendor</p></Link>
          </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
