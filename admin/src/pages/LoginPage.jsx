import "../style/adminlogin.css"
import LoginComponent from "../components/LoginComponent";

const LoginPage = () => {
  return (
    <>
      <div className="hero-section-login">
        <div className="section">
          <div className="login">
            <LoginComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
