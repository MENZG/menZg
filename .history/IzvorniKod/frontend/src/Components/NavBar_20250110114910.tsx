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
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik>();
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull>();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const responseUlogirani = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          {
            withCredentials: true,
          }
        );
        setKorisnik(responseUlogirani.data);
        korisnikEmail = korisnik?.email;
        const responseKorisnikFull = await axios.get<KorisnikFull>(
          `${apiUrl}/korisnici/${}`,
          {
            withCredentials: true,
          }
        );
        setKorisnik(responseUlogirani.data);

        if (responseUser.status === 200) {
          setIsLoggedIn(true);
        }

        const loggedUser = responseKorisnici.data.find(
          (korisnik) => korisnik.username === responseUser.data.email
        );

        if (loggedUser) {
          switch (loggedUser.role) {
            case 1:
              setRole("Student");
              break;
            case 2:
              setRole("Djelatnik menze");
              break;
            case 3:
              setRole("Administrator");
              break;
            default:
              setRole("Nepoznata uloga");
          }
        } else {
          console.warn("Korisnik nije pronađen u listi korisnika.");
          setRole("");
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju statusa korisnika:", error);
        setIsLoggedIn(false);
        setRole("");
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
    console.log("logout");
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
