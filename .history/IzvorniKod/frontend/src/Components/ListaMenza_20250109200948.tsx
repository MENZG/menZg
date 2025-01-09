import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menza } from "../types.ts";
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

  // API funkcija za dodavanje u favorite
  const addToFavorites = async (idMenza: number) => {
    try {
      await axios.post(`${apiUrl}/korisnici/1/omiljenaMenza/${idMenza}`);
      setFavorites((prevFavorites) => [...prevFavorites, idMenza]);
    } catch (error) {
      console.error("Error adding menza to favorites:", error);
    }
  };

  // API funkcija za uklanjanje iz favorita
  const removeFromFavorites = async (idMenza: number) => {
    try {
      await axios.delete(`${apiUrl}/korisnici/1/omiljenaMenza/${idMenza}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== idMenza)
      );
    } catch (error) {
      console.error("Error removing menza from favorites:", error);
    }
  };

  // Toggle funkcija za favorite (poziva odgovarajući API)
  const toggleFavorite = (idMenza: number) => {
    if (favorites.includes(idMenza)) {
      removeFromFavorites(idMenza);
    } else {
      addToFavorites(idMenza);
    }
  };

  // Dohvaćanje omiljenih menzi prilikom inicijalizacije
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<number[]>(
          `${apiUrl}/korisnici/1/omiljenaMenza`
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorite menze:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Dohvaćanje svih menzi
  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>(`${apiUrl}/menza`, {
          withCredentials: true,
        });
        setMenze(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju menzi:", error);
      }
    };

    fetchMenze();
  }, []);

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
