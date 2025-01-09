import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menza, UlogiraniKorisnik } from "../types.ts";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_URL;

const daysOfWeek = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
];

const formatTime = (time: string | null) => {
  return time ? time.split(":").slice(0, 2).join(":") : "Ne radi";
};

const ListaMenza = () => {
  const [menze, setMenze] = useState<Menza[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | null>(null);
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull>();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>(
          //         "https://backendservice-xspx.onrender.com/api/menza",
          `${apiUrl}/menza`,
          {
            withCredentials: true, // OVO MORA BIT TRUE KOJI KURAC
          }
        );
        setMenze(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju menzi: -----------", error);
      }
    };

    fetchMenze();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          {
            withCredentials: true,
          }
        );
        setKorisnik(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika: ", error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<KorisnikFull>(
          `${apiUrl}/korisnici/username/${korisnikEmail}`,
          {
            withCredentials: true,
          }
        );
        setKorisnikFull(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju favorita: ", error);
        setLoading(false);
      }
    };

    if (korisnikEmail) {
      fetchFavorites();
    }
  }, [korisnikEmail]);

  const toggleFavorite = async (idMenza: number) => {
    const idKorisnik = korisnik?.email;
    try {
      if (favorites.includes(idMenza)) {
        // Ukloni menzu iz favorita (DELETE zahtjev)
        await axios.delete(
          `${apiUrl}/korisnici/${idKorisnik}/omiljenaMenza/${idMenza}`,
          {
            withCredentials: true,
          }
        );
        setFavorites((prevFavorites) =>
          prevFavorites.filter((id) => id !== idMenza)
        );
      } else {
        // Dodaj menzu u favorite (POST zahtjev)
        await axios.post(
          `${apiUrl}/korisnici/${idKorisnik}/omiljenaMenza/${idMenza}`,
          null,
          {
            withCredentials: true,
          }
        );
        setFavorites((prevFavorites) => [...prevFavorites, idMenza]);
      }
    } catch (error) {
      console.error("Greška pri ažuriranju favorita: ", error);
    }
  };

  if (loading)
    return (
      <>
        <NavBar />
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  const today = new Date().getDay();
  const todayName = daysOfWeek[today];
  return (
    <>
      <NavBar />
      <div className="card-container">
        {menze.map((menza) => (
          <Link
            key={menza.idMenza}
            to={`/menza/${menza.idMenza}`}
            className="card"
            style={{ width: "18rem", textDecoration: "none", color: "inherit" }}
          >
            <img
              src={`/slika_menza_${menza.idMenza}.jpg`}
              className="card-img-top"
              alt={`Slika menze ${menza.imeMenze}`}
            />
            <div
              className="favorite-icon"
              onClick={(e) => {
                e.preventDefault(); // Spriječi navigaciju na link
                toggleFavorite(menza.idMenza);
              }}
            >
              {favorites.includes(menza.idMenza) ? (
                <FaHeart size={17} />
              ) : (
                <FaRegHeart size={17} />
              )}
            </div>

            <div className="card-body">
              <h5 className="card-title">{menza.imeMenze}</h5>
              <div className="card-text">
                {menza.radnaVremena
                  .filter((rv) => rv.dan === todayName)
                  .map((rv) => (
                    <div key={rv.idRadnoVrijeme}>
                      {rv.dan}: {formatTime(rv.pocetak)} - {formatTime(rv.kraj)}
                    </div>
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;
