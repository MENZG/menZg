import { useEffect, useState } from "react";
import { KorisnikFull, Menza, UlogiraniKorisnik } from "../types";
import NavBar from "./NavBar";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import KameraIkona from "./KameraIkona";

const apiUrl = import.meta.env.VITE_API_URL;

const Favoriti = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [loading, setLoading] = useState(true);
  const [korisnik, setKorisnik] = useState<UlogiraniKorisnik | null>(null);
  const [korisnikFull, setKorisnikFull] = useState<KorisnikFull>();
  const [menze, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get<UlogiraniKorisnik>(
          `${apiUrl}/korisnici/user`,
          {
            withCredentials: true,
          }
        );
        setKorisnik(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika: ", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const korisnikEmail = korisnik?.email;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<KorisnikFull>(
          `${apiUrl}/korisnici/username/${korisnikEmail}`,
          {
            withCredentials: true,
          }
        );
        setKorisnikFull(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju favorita: ", error);
        setLoading(false);
      }
    };

    if (korisnikEmail) {
      fetchFavorites();
    }
  }, [korisnikEmail]);

  useEffect(() => {
    if (korisnikFull?.omiljeneMenza) {
      setMenze(korisnikFull.omiljeneMenza);
    }
  }, [korisnikFull]);

  const korisnikId = korisnikFull?.idKorisnik;

  const deleteFavorite = async (idMenza: number) => {
    try {
      await axios.delete(
        `${apiUrl}/korisnici/${korisnikId}/omiljenaMenza/${idMenza}`,
        { withCredentials: true }
      );
      setMenze((prevMenze) =>
        prevMenze.filter((menza) => menza.idMenza !== idMenza)
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
        {menze.length === 0 ? (
          <p style={{ color: "white" }}>Nemate omiljenih menzi.</p>
        ) : (
          <div className="card-container">
            {menze.map((menza) => (
              <Link to={`/menza/${menza.idMenza}`} className="custom-link">
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFavorite(menza.idMenza);
                    }}
                    className="favorite-icon"
                  >
                    {isFavorite ? (
                      <FaHeart size={17} />
                    ) : (
                      <FaRegHeart size={17} />
                    )}
                  </button>
                  <div className="card-body">
                    <h5 className="card-title">{menza.imeMenze}</h5>

                    <div className="camera-icon">
                      <KameraIkona></KameraIkona>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favoriti;
