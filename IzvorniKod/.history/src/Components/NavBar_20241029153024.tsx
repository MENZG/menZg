import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/login/student");
  };

  const handleAdminLogin = () => {
    navigate("/login/admin");
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
              <a className="nav-link active" aria-current="page" href="#">
                Menze
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Moji favoriti
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profil
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
