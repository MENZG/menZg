import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Menza } from "../types.ts";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";

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

  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>(
          "https://backendmain-i5ve.onrender.com/api/menza"
        );
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
          <Link
            key={menza.idMenza}
            to={`/menza/${menza.idMenza}`}
            className="card"
            style={{ width: "18rem", textDecoration: "none", color: "inherit" }}
          >
            <img
              src={`/slika_menza_${menza.idMenza}.jpg`}
              className="card-img-top"
              alt={`Slika menze ${menza.imeMenze}`}
            />
            <div className="card-body">
              <h5 className="card-title">{menza.imeMenze}</h5>
              <p className="card-text">
                {menza.radnaVremena
                  .filter((rv) => rv.dan === todayName)
                  .map((rv) => (
                    <div key={rv.idRadnoVrijeme}>
                      {rv.dan}: {formatTime(rv.pocetak)} - {formatTime(rv.kraj)}
                    </div>
                  ))}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;
