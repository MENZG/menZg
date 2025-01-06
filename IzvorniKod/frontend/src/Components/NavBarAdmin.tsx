import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavBarAdmin = () => {
  const navigate = useNavigate();

  const handleOnClickMenze = () => {
    navigate("/admin/menze");
  };

  const handleOnClickAddMenza = () => {
    navigate("/admin/dodajMenzu");
  };

  const handleOnClickAddEmployee = () => {
    navigate("/admin/dodajDjelatnika");
  };

  const handleOnClickLogo = () => {
    navigate("/menze");
  };

  const handleOnClickUsers = () => {
    navigate("/korisnici")
  }
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
                menze
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickAddMenza}>
                dodavanje menzi
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickAddEmployee}>
                dodavanje djelatnika
              </Button>
            </li>
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickUsers}>
                korisnici
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarAdmin;
