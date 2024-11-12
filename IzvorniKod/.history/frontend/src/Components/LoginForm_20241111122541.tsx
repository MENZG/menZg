import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function LoginForm() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/login/admin");
  };

  const handleEmployeeLogin = () => {
    navigate("/login/employee");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">ulogiraj se!</h1>
      <form className="login-form">
        <input type="email" placeholder="e-mail" className="login-input" />
        <input type="password" placeholder="lozinka" className="login-input" />
        <button type="submit" className="login-button">
          prijava
        </button>
      </form>
      <div className="login-options">
        <span>prijava za:</span>
        <button className="role-button">djelatnike</button>
        <button className="role-button">admin</button>
      </div>
    </div>
  );
}

export default LoginForm;
