import { useEffect, useState } from "react";
import { Menza } from "../types";
import NavBar from "./NavBar";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const Profil = () => {
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

  return (
    <>
      <NavBar />
    </>
  );
};

export default Profil;
