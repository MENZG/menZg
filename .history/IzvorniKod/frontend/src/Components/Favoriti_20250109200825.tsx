import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const Favoriti = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [menze, setMenze] = useState<Menza[]>([]);

  // Dohvaćanje omiljenih iz localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Dohvaćanje liste svih menzi
  useEffect(() => {
    axios
      .get(`${apiUrl}/menza`)
      .then((response) => {
        setMenze(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // API funkcija za dodavanje menze u favorite
  const addToFavorites = async (menzaId: number) => {
    try {
      await axios.post(`${apiUrl}/korisnici/1/omiljenaMenza/${menzaId}`);
      setFavorites((prev) => [...prev, menzaId]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, menzaId])
      );
    } catch (error) {
      console.error("Error adding menza to favorites:", error);
    }
  };

  // API funkcija za uklanjanje menze iz favorita
  const removeFromFavorites = async (menzaId: number) => {
    try {
      await axios.delete(`${apiUrl}/korisnici/1/omiljenaMenza/${menzaId}`);
      const updatedFavorites = favorites.filter((id) => id !== menzaId);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing menza from favorites:", error);
    }
  };

  const favoriteMenze = menze.filter((menza) =>
    favorites.includes(menza.idMenza)
  );

  return (
    <>
      <NavBar />
      <div>
        <div className="card-container">
          {menze.map((menza) => (
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
                {favorites.includes(menza.idMenza) ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromFavorites(menza.idMenza)}
                  >
                    Ukloni iz favorita
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToFavorites(menza.idMenza)}
                  >
                    Dodaj u favorite
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favoriti;
