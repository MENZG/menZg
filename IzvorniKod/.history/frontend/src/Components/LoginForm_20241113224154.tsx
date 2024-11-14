import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import googleLogo from "../../public/google-logo.png"; // Make sure to have the Google logo image in the specified path
import Snowfall from "react-snowfall";

function LoginForm() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/menze");
  };

  return (
    <div className="login-page">
      <Snowfall />
      <div className="login-form-container">
        <Button
          variant="dark"
          size="lg"
          className="login-submit-btn"
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="Google logo" className="google-logo" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
