import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import NavBar from "./NavBar";
import Chat from "./Chat";
import KameraIkona from "./KameraIkona";
import "/src/styles/ListaMenza.css";

interface Menza {
  idMenza: number;
  imeMenze: string;
  radnaVremena: {
    dan: string;
    pocetak: string;
    kraj: string;
    idRadnoVrijeme: number;
  }[];
}

const apiUrl = import.meta.env.VITE_API_URL;

const ListaMenza = () => {
  const [menze, setMenze] = useState<Menza[]>([]); // Define state type
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>(`${apiUrl}/menza`, {
          withCredentials: true,
        });
        setMenze(response.data);
      } catch (err) {
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenze();
  }, []);

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

  return (
    <>
      <NavBar />
      <div className={`card-container ${isChatOpen ? "blurred" : ""}`}>
        {menze.map((menza) => (
          <Link
            to={`/menza/${menza.idMenza}`}
            className="custom-link"
            key={menza.idMenza}
          >
            <div className="card">
              <img
                src={`/slika_menza_${menza.idMenza}.jpg`}
                className="card-img-top"
                alt={`Slika menze ${menza.imeMenze}`}
              />
              <button
                className="favorite-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  // Toggle favorite logic
                }}
              >
                {favorites.includes(menza.idMenza) ? (
                  <FaHeart size={17} />
                ) : (
                  <FaRegHeart size={17} />
                )}
              </button>
              <div className="card-body">
                <h5 className="card-title">{menza.imeMenze}</h5>
                <div className="card-text">Details here...</div>
                <KameraIkona />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className="open-chat-btn" onClick={() => setIsChatOpen(true)}>
        Open Chat
      </button>
      {isChatOpen && (
        <div className="chat-popup">
          <Chat />
          <button
            className="close-chat-btn"
            onClick={() => setIsChatOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default ListaMenza;
