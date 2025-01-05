import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL je:", apiUrl);

const Profil = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [menze, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Fetchaj sve menze
    const fetchMenze = async () => {
      const response = await axios.get<Menza[]>(`${apiUrl}/api/menza`);
      setMenze(response.data);
    };

    fetchMenze();
  }, []);

  // Filtriraj menze koje su među favoritima
  const favoriteMenze = menze.filter((menza) =>
    favorites.includes(menza.idMenza)
  );

  return (
    <>
      <NavBar />
      <div>
        <h1>Favoriti</h1>
        <div className="card-container">
          {favoriteMenze.map((menza) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profil;
