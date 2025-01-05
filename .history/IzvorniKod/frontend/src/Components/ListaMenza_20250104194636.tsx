import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menza } from "../types.ts";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";

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

  const toggleFavorite = (idMenza: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(idMenza)
        ? prevFavorites.filter((id) => id !== idMenza)
        : [...prevFavorites, idMenza]
    );
  };

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
        const response = await axios.get<Menza[]>(`${apiUrl}/api/menza`);
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
          <div
            key={menza.idMenza}
            className="card"
            style={{ width: "18rem", position: "relative" }}
          >
            <div
              className="favorite-icon"
              onClick={() => toggleFavorite(menza.idMenza)}
            >
              {favorites.includes(menza.idMenza) ? "★" : "☆"}
            </div>
            <Link
              to={`/menza/${menza.idMenza}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={`/slika_menza_${menza.idMenza}.jpg`}
                className="card-img-top"
                alt={`Slika menze ${menza.imeMenze}`}
              />
              <div className="card-body">
                <h5 className="card-title">{menza.imeMenze}</h5>
                <p className="card-text">
                  {menza.radnaVremena.some((rv) => rv.dan === todayName) ? (
                    menza.radnaVremena
                      .filter((rv) => rv.dan === todayName)
                      .map((rv) => (
                        <div key={rv.idRadnoVrijeme}>
                          {rv.dan}: {formatTime(rv.pocetak)} -{" "}
                          {formatTime(rv.kraj)}
                        </div>
                      ))
                  ) : (
                    <div>Ne radi danas</div>
                  )}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;