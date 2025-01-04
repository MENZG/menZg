import { Button } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import googleLogo from "../../public/google-logo.png"; // Make sure to have the Google logo image in the specified path
import "../styles/Login.css";

function LoginForm() {
  //const navigate = useNavigate();

  // Uzimamo URL za backend iz environment varijable

  const handleGoogleLogin = async () => {
    try {
      // Backend URL je tvrdo kodiran
      window.location.href =
        "https://backendservice-xspx.onrender.com/api/oauth2/authorization/google";
    } catch (error) {
      console.error("Došlo je do greške prilikom Google login-a:", error);
    }
  };

  /*function LoginForm() {
    // Funkcija za login s Google-om
    const handleGoogleLogin = async () => {
      try {
        // Dohvatite OAuth URL sa backend-a
        const response = await fetch("https://backendservice-xspx.onrender.com/api/auth/google");
        if (!response.ok) {
          throw new Error("Failed to fetch Google login URL");
        }
        const url = await response.text(); // Ovo je URL koji backend generira
        window.location.href = url; // Preusmjerite korisnika na URL
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    };*/

  return (
    <div className="login-page">
      <Snowfall />

      <div className="login-form-container">
        <img src="/MenZagreb.png" alt="logo slika" className="logo-img"></img>
        <br />
        <br />
        <h1>DOBAR DAN????</h1>
        <h2>prijavi seee!</h2>
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
