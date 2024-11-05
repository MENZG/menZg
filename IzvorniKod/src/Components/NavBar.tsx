import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  const handleOnClickMenze = () => {
    navigate("/home");
  };

  const handleOnClickFavoriti = () => {
    navigate("/home/favorites");
  };

  const handleOnClickProfil = () => {
    navigate("/profile");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      <div className="container-fluid">
        <img
          src="/src/public/MenZg.png"
          alt="logo slika"
          className="logo-img"
        ></img>
        <div className="nav-btn-container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickMenze}>
                Menze
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickFavoriti}>
                Moji favoriti
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickProfil}>
                Profil
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
