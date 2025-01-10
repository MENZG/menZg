import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { KorisnikFull, UlogiraniKorisnik } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | undefined>();
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull | undefined>();

  const determineRole = (role: number): string => {
    switch (role) {
      case 1:
        return "Student";
      case 2:
        return "Djelatnik menze";
      case 3:
        return "Administrator";
      default:
        return "Nepoznata uloga";
    }
  };

  useEffect(() => {
    console.log("Novi status isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUlogirani = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          { withCredentials: true }
        );
        setKorisnik(responseUlogirani.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Greška pri dohvaćanju statusa Ulogiranog:", error);
        setIsLoggedIn(false);
        setRole("");
        setKorisnik(undefined);
        setKorisnikFull(undefined);
      }
    };
    fetchUserData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchKorisnikFull = async () => {
      if (korisnik?.email) {
        try {
          const responseKorisnikFull = await axios.get<KorisnikFull>(
            `${apiUrl}/korisnici/username/${korisnik.email}`,
            { withCredentials: true }
          );
          setKorisnikFull(responseKorisnikFull.data);
          const roleString = determineRole(responseKorisnikFull.data.role);
          setRole(roleString);
        } catch (error) {
          console.error("Greška pri dohvaćanju korisnika:", error);
          setRole("");
        }
      }
    };
    fetchKorisnikFull();
  }, [korisnik, apiUrl]);

  console.log(role);

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
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsLoggedIn(false);
      setKorisnik(undefined);
      setKorisnikFull(undefined);
      setRole("");

      // Ovdje će `isLoggedIn` još uvijek biti true
      setTimeout(() => {
        console.log("Provjera nakon odjave:", isLoggedIn);
      }, 0);

      // Preusmjeri na login stranicu
      navigate("/login/student");
      console.log("Korisnik je uspješno odjavljen.");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
  };

  const handleOnClickKorisnici = () => {
    navigate("/korisnici");
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
            {role === "Administrator" ? (
              <li className="nav-item">
                <Button className="nav-btn" onClick={handleOnClickKorisnici}>
                  Korisnici
                </Button>
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
        {isLoggedIn ? (
          <div className="role-div">
            <p className="role-p">
              Prijavljeni ste kao <strong>{role}</strong>
            </p>
            <Button className="log-btn" onClick={handleOnClickLogout}>
              Odjavi se
            </Button>
          </div>
        ) : (
          <div className="role-div">
            <Button className="log-btn" onClick={handleOnClickLogin}>
              Ulogiraj se
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

const MobileNavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | undefined>();
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull | undefined>();
  const [menuOpen, setMenuOpen] = useState(false); // Kontrola hamburger menija

  const determineRole = (role: number): string => {
    switch (role) {
      case 1:
        return "Student";
      case 2:
        return "Djelatnik menze";
      case 3:
        return "Administrator";
      default:
        return "Nepoznata uloga";
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUlogirani = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          { withCredentials: true }
        );
        setKorisnik(responseUlogirani.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Greška pri dohvaćanju statusa Ulogiranog:", error);
        setIsLoggedIn(false);
        setRole("");
        setKorisnik(undefined);
        setKorisnikFull(undefined);
      }
    };
    fetchUserData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchKorisnikFull = async () => {
      if (korisnik?.email) {
        try {
          const responseKorisnikFull = await axios.get<KorisnikFull>(
            `${apiUrl}/korisnici/username/${korisnik.email}`,
            { withCredentials: true }
          );
          setKorisnikFull(responseKorisnikFull.data);
          const roleString = determineRole(responseKorisnikFull.data.role);
          setRole(roleString);
        } catch (error) {
          console.error("Greška pri dohvaćanju korisnika:", error);
          setRole("");
        }
      }
    };
    fetchKorisnikFull();
  }, [korisnik, apiUrl]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false); // Zatvara meni nakon navigacije
  };
  return (
    <div className="container-fluid">
      {/* Logo */}
      <img
        src="/MenZagreb.png"
        alt="logo slika"
        className="logo-img"
        onClick={() => handleNavigation("/menze")}
      />
      {/* Hamburger ikona */}
      <button
        className="hamburger"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {/* Navigacijski meni */}
      <div className={`nav-menu ${menuOpen ? "show" : ""}`}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button
              className="nav-btn"
              onClick={() => handleNavigation("/menze")}
            >
              Menze
            </button>
          </li>
          {role === "Administrator" ? (
            <li className="nav-item">
              <button
                className="nav-btn"
                onClick={() => handleNavigation("/korisnici")}
              >
                Korisnici
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <button
                  className="nav-btn"
                  onClick={() => handleNavigation("/favoriti")}
                >
                  Favoriti
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-btn"
                  onClick={() => handleNavigation("/profil")}
                >
                  Profil
                </button>
              </li>
            </>
          )}
        </ul>
        {/* Prijava/odjava */}
        {isLoggedIn ? (
          <div className="role-div">
            <p className="role-p">
              Prijavljeni ste kao <strong>{role}</strong>
            </p>
            <button
              className="log-btn"
              onClick={() => {
                document.cookie =
                  "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setIsLoggedIn(false);
                setKorisnik(undefined);
                setKorisnikFull(undefined);
                setRole("");
                handleNavigation("/login/student");
              }}
            >
              Odjavi se
            </button>
          </div>
        ) : (
          <div className="role-div">
            <button
              className="log-btn"
              onClick={() => handleNavigation("/login/student")}
            >
              Ulogiraj se
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DesktopNavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | undefined>();
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull | undefined>();

  const determineRole = (role: number): string => {
    switch (role) {
      case 1:
        return "Student";
      case 2:
        return "Djelatnik menze";
      case 3:
        return "Administrator";
      default:
        return "Nepoznata uloga";
    }
  };

  useEffect(() => {
    console.log("Novi status isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUlogirani = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          { withCredentials: true }
        );
        setKorisnik(responseUlogirani.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Greška pri dohvaćanju statusa Ulogiranog:", error);
        setIsLoggedIn(false);
        setRole("");
        setKorisnik(undefined);
        setKorisnikFull(undefined);
      }
    };
    fetchUserData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchKorisnikFull = async () => {
      if (korisnik?.email) {
        try {
          const responseKorisnikFull = await axios.get<KorisnikFull>(
            `${apiUrl}/korisnici/username/${korisnik.email}`,
            { withCredentials: true }
          );
          setKorisnikFull(responseKorisnikFull.data);
          const roleString = determineRole(responseKorisnikFull.data.role);
          setRole(roleString);
        } catch (error) {
          console.error("Greška pri dohvaćanju korisnika:", error);
          setRole("");
        }
      }
    };
    fetchKorisnikFull();
  }, [korisnik, apiUrl]);

  console.log(role);

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
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsLoggedIn(false);
      setKorisnik(undefined);
      setKorisnikFull(undefined);
      setRole("");

      // Ovdje će `isLoggedIn` još uvijek biti true
      setTimeout(() => {
        console.log("Provjera nakon odjave:", isLoggedIn);
      }, 0);

      // Preusmjeri na login stranicu
      navigate("/login/student");
      console.log("Korisnik je uspješno odjavljen.");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
  };

  const handleOnClickKorisnici = () => {
    navigate("/korisnici");
  };

  return (
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
          {role === "Administrator" ? (
            <li className="nav-item">
              <Button className="nav-btn" onClick={handleOnClickKorisnici}>
                Korisnici
              </Button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="role-div">
          <p className="role-p">
            Prijavljeni ste kao <strong>{role}</strong>
          </p>
          <Button className="log-btn" onClick={handleOnClickLogout}>
            Odjavi se
          </Button>
        </div>
      ) : (
        <div className="role-div">
          <Button className="log-btn" onClick={handleOnClickLogin}>
            Ulogiraj se
          </Button>
        </div>
      )}
    </div>
  );
};
