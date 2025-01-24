import { Button } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import googleLogo from "../../public/google-logo.png"; // Make sure to have the Google logo image in the specified path
import "../styles/Login.css";

const apiUrl = import.meta.env.VITE_API_URL;

function LoginForm() {
  const handleGoogleLogin = async () => {
    try {
      window.location.href =
        //"https://backendservice-xspx.onrender.com/api/oauth2/authorization/google";
        `${apiUrl}/oauth2/authorization/google`;
    } catch (error) {
      console.error("Došlo je do greške prilikom Google login-a:", error);
    }
  };

  return (
    <div className="login-page">
      <Snowfall />

      <div className="login-form-container">
        <img src="/MenZagreb.png" alt="logo slika" className="logo-img"></img>
        <br />
        <br />
        <h1>Ne da ti se čekati u redu za menzu?</h1>
        <h2>Prijavi se!</h2>
        <br />
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
