import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  const handleOnClickMenze = () => {
    navigate("/menze");
  };

  const handleOnClickProfil = () => {
    navigate("/profil");
  };

  const handleOnClickLogo = () => {
    navigate("/menze");
  };

  const handleOnClickFavoriti = () => {
    navigate("/favoriti");
  };

  const handleOnClickLogin = () => {
    navigate("/login/student");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      <div className="container-fluid">
        <img
          src="/MenZagreb.png"
          alt="logo slika"
          className="logo-img"
          onClick={handleOnClickLogo}
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
                Favoriti
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickProfil}>
                Profil
              </Button>
            </li>
          </ul>
          <Button className="nav-btn" onClick={handleOnClickLogin}>
            Ulogiraj se
          </Button>{" "}
          ?
          <div>
            <Button className="nav-btn" onClick={handleOnClickLogin}>
              Odjavi se
            </Button>
            <p>Prijavljeni ste kao {role}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;