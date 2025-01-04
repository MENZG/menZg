import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";

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
    <div>
      <NavBar />
      <h1>Favoriti</h1>
      <div className="card-container">
        {favoriteMenze.map((menza) => (
          <div key={menza.idMenza}>
            <h3>{menza.imeMenze}</h3>
            {/* Ostale informacije o menzi */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profil;
