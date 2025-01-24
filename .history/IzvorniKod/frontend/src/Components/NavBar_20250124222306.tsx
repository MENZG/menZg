import "/src/styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { KorisnikFull, UlogiraniKorisnik } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-bg">
      {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
    </nav>
  );
};

export default NavBar;

const MobileNavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | undefined>();
  const [, setKorisnikFull] = useState<KorisnikFull | undefined>();
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

  const handleOnClickLogout = async () => {
    try {
      await axios.post(`${apiUrl}/korisnici/odjavi`, null, {
        withCredentials: true,
      });

      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      setKorisnik(undefined);
      setKorisnikFull(undefined);
      setRole("");

      navigate("/login/student");
      console.log("Korisnik je uspješno odjavljen.");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
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
            <button className="log-btn" onClick={handleOnClickLogout}>
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
  const [, setKorisnikFull] = useState<KorisnikFull | undefined>();

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
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
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
      // Call the logout API to invalidate the session server-side
      await axios.post(`${apiUrl}/korisnici/odjavi`, null, {
        withCredentials: true,
      });

      // Clear cookies
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Clear React state for logged-in user
      setIsLoggedIn(false);
      setKorisnik(undefined);
      setKorisnikFull(undefined);
      setRole("");

      // Redirect to the login page
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
