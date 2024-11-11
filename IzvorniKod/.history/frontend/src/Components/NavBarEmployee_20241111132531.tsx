import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBarEmployee = () => {
  const navigate = useNavigate();

  const handleOnClickMenze = () => {
    navigate("/admin/menze");
  };

  const handleOnClickAddMeals = () => {
    navigate("/djelatnik/dodajJelovnik");
  };

  const handleOnClickAddWorkingHours = () => {
    navigate("/djelatnik/dodajRadnoVrijeme");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      <div className="container-fluid">
        <img
          src="/src/public/MenZagreb.png"
          alt="logo slika"
          className="logo-img"
        ></img>
        <div className="nav-btn-container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickMenze}>
                menze
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickAddMeals}>
                dodavanje jelovnika
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className="nav-btn"
                onClick={handleOnClickAddWorkingHours}
              >
                unos radnog vremena
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarEmployee;
