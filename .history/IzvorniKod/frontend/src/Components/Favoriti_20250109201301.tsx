import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const Favoriti = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [menze, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    console.log(storedFavorites);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

  const favoriteMenze = menze.filter((menza) =>
    favorites.includes(menza.idMenza)
  );

  const handleDelete = (idKorisnik: string) => {
    axios
      .delete(`${apiUrl}/korisnici/${idKorisnik}`, { withCredentials: true })
      .then(() => {
        // Remove the deleted user from the state
        setData((prevData) =>
          prevData.filter((korisnik) => korisnik.idKorisnik !== idKorisnik)
        );
        console.log(`User with ID: ${idKorisnik} deleted successfully`);
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <>
      <NavBar />
      <div>
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

export default Favoriti;
