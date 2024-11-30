import { Button } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import googleLogo from "../../public/google-logo.png"; // Make sure to have the Google logo image in the specified path
import "../styles/Login.css";

function LoginForm() {
  //const navigate = useNavigate();

  // Uzimamo URL za backend iz environment varijable


  const handleGoogleLogin = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL; // uzima tu varijablu iz env datoteke
    console.log(backendUrl + ' nikolaaa')
    console.log("sve varijable okoline " + process.env);  // Ispisuje sve učitane varijable okruženja

    window.location.href = "https://backendservice-xspx.onrender.com/oauth2/authorization/google";
  };

  return (
    <div className="login-page">
      <Snowfall />

      <div className="login-form-container">
        <img src="/MenZagreb.png" alt="logo slika" className="logo-img"></img>
        <br />
        <br />
        <h1>GLADAN SI?</h1>
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
