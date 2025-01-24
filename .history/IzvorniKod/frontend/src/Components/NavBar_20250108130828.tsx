import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch(apiUrl, {
          credentials: "include", // Ako koristite kolačiće za autentifikaciju
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setRole(data.role); // Pretpostavljam da API vraća ulogu u "data.role"
        } else {
          setIsLoggedIn(false);
          setRole("");
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju statusa korisnika:", error);
        setIsLoggedIn(false);
      }
    };
    checkUserStatus();
  }, [apiUrl]);

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

  const handleOnClickLogout = async () => {
    try {
      await fetch(`${apiUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setRole("");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
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
          {isLoggedIn ? (
            <div>
              <Button className="nav-btn" onClick={handleOnClickLogout}>
                Odjavi se
              </Button>
              <p>
                Prijavljeni ste kao <strong>{role}</strong>
              </p>
            </div>
          ) : (
            <Button className="nav-btn" onClick={handleOnClickLogin}>
              Ulogiraj se
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
