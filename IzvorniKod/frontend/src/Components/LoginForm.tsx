import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function LoginForm() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/menze");
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <Button className="login-submit-btn" onClick={handleGoogleLogin}>
          SIGN IN WITH GOOGLE
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
