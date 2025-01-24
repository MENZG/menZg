import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { KorisnikFull, Menza, UlogiraniKorisnik } from "../types.ts";
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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | null>(null);
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull | null>(null);

  useEffect(() => {
    const streamStart = async () => {
      try {
        const streamStartResponse = await axios.post(`${apiUrl}/start/stream`);
        console.log("Stream started successfully", streamStartResponse);
      } catch (error) {
        console.error("Error starting stream:", error);
      }
    };

    // Call streamStart every 60 seconds
    const interval = setInterval(() => {
      streamStart();
    }, 5000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Fetch all "menze"
  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>(`${apiUrl}/menza`, {
          withCredentials: true,
        });
        setMenze(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju menzi:", error);
        //setError("Neuspjelo dohvaćanje menzi.");
        setError("Ulogirajte se kako biste vidjeli menze.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenze();
  }, []);

  // Fetch the current user (basic info)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          { withCredentials: true }
        );
        setKorisnik(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
        setError("Neuspjelo dohvaćanje korisnika.");
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch full user info (korisnikFull) based on email from `korisnik`
  useEffect(() => {
    const fetchFullUser = async () => {
      if (!korisnik?.email) return;

      try {
        const response = await axios.get<KorisnikFull>(
          `${apiUrl}/korisnici/username/${korisnik.email}`,
          { withCredentials: true }
        );
        setKorisnikFull(response.data);
        console.log("korisnik full", korisnikFull);
        setFavorites(response.data.omiljeneMenza.map((m) => m.idMenza)); // Sync favorites
      } catch (error) {
        console.error(
          "Greška pri dohvaćanju dodatnih podataka o korisniku:",
          error
        );
        setError("Neuspjelo dohvaćanje dodatnih podataka o korisniku.");
      }
    };

    fetchFullUser();
  }, [korisnik]);

  // Toggle favorite status
  const toggleFavorite = async (idMenza: number) => {
    const idKorisnik = korisnikFull?.idKorisnik;
    if (!idKorisnik) {
      setError("Morate biti prijavljeni za spremanje favorita.");
      return;
    }

    try {
      if (favorites.includes(idMenza)) {
        // Remove favorite
        await axios.delete(
          `${apiUrl}/korisnici/${idKorisnik}/omiljenaMenza/${idMenza}`,
          { withCredentials: true }
        );
        setFavorites((prev) => prev.filter((id) => id !== idMenza));
      } else {
        // Add favorite
        await axios.post(
          `${apiUrl}/korisnici/${idKorisnik}/omiljenaMenza/${idMenza}`,
          null,
          { withCredentials: true }
        );
        setFavorites((prev) => [...prev, idMenza]);
      }
    } catch (error) {
      console.error("Greška pri ažuriranju favorita:", error);
      setError("Neuspjelo ažuriranje favorita.");
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <p className="error-message">{error}</p>
      </>
    );
  }

  const today = new Date().getDay();
  const todayName = daysOfWeek[today];

  const canShowFavorites = korisnikFull?.role !== 3;

  return (
    <>
      <NavBar />
      <div className="card-container">
        {menze.map((menza) => (
          <Link to={`/menza/${menza.idMenza}`} className="custom-link">
            <div
              key={menza.idMenza}
              className="card"
              style={{
                width: "18rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={`/slika_menza_${menza.idMenza}.jpg`}
                className="card-img-top"
                alt={`Slika menze ${menza.imeMenze}`}
              />
              {canShowFavorites && (
                <button
                  className="favorite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite(menza.idMenza);
                  }}
                >
                  {favorites.includes(menza.idMenza) ? (
                    <FaHeart size={17} />
                  ) : (
                    <FaRegHeart size={17} />
                  )}
                </button>
              )}

              <div className="card-body">
                <h5 className="card-title">{menza.imeMenze}</h5>
                <div className="card-text">
                  {menza.radnaVremena
                    .filter((rv) => rv.dan === todayName)
                    .map((rv) => (
                      <div key={rv.idRadnoVrijeme}>
                        {rv.dan}: {formatTime(rv.pocetak)} -{" "}
                        {formatTime(rv.kraj)}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;
