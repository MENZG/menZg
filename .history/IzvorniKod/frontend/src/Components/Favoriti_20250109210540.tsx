import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const apiUrl = import.meta.env.VITE_API_URL;

const Favoriti = () => {
  const [favorites, setFavorites] = useState<Menza[]>([]); // Sprema cijele menze, ne samo ID-jeve
  const [loading, setLoading] = useState(true);
  const korisnik = JSON.parse(localStorage.getItem("korisnik") || "null"); // Pretpostavljam da korisnik postoji u localStorage

  useEffect(() => {
    // Dohvati omiljene menze s backend-a
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<Menza[]>(
          `${apiUrl}/korisnici/${korisnik?.email}/omiljeneMenze`,
          {
            withCredentials: true,
          }
        );
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju favorita: ", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [korisnik]);

  const deleteFavorite = async (idMenza: number) => {
    try {
      // Pošalji DELETE zahtjev za uklanjanje menze iz favorita
      await axios.delete(
        `${apiUrl}/korisnici/${korisnik?.email}/omiljenaMenza/${idMenza}`,
        { withCredentials: true }
      );

      // Ukloni menzu lokalno
      setFavorites((prevFavorites) =>
        prevFavorites.filter((menza) => menza.idMenza !== idMenza)
      );
    } catch (error) {
      console.error("Greška pri brisanju favorita: ", error);
    }
  };

  if (loading) return <p>Učitavanje favorita...</p>;

  return (
    <>
      <NavBar />
      <div>
        <h1>Omiljene menze</h1>
        {favorites.length === 0 ? (
          <p>Nemate omiljenih menzi.</p>
        ) : (
          <div className="card-container">
            {favorites.map((menza) => (
              <div
                key={menza.idMenza}
                className="card"
                style={{ width: "18rem" }}
              >
                <img
                  src={`/slika_menza_${menza.idMenza}.jpg`}
                  className="card-img-top"
                  alt={`Slika menze ${menza.imeMenze}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{menza.imeMenze}</h5>
                  <button
                    onClick={() => deleteFavorite(menza.idMenza)}
                    className="delete-favorite"
                  >
                    <FaHeart size={17} color="red" />
                    Ukloni iz favorita
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favoriti;
