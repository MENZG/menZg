import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  const handleOnClickMenze = () => {
    navigate("/menze");
  };

  const handleOnClickFavoriti = () => {
    navigate("/menze/mojifavoriti");
  };

  const handleOnClickProfil = () => {
    navigate("/profil");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img
          src="/src/public/MenZg.png"
          alt="logo slika"
          className="logo-img"
        ></img>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button
                {/* variant="link" */}
                className="nav-btn"
                onClick={handleOnClickMenze}
              >
                Menze
              </Button>
            </li>
            <li className="nav-item">
              <Button
                {/* variant="link" */}
                className="nav-btn"
                onClick={handleOnClickFavoriti}
              >
                Moji favoriti
              </Button>
            </li>
            <li className="nav-item">
              <Button
                {/* variant="link" */}
                className="nav-btn"
                onClick={handleOnClickProfil}
              >
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
