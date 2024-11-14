import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";
import { Menza } from "../types.ts";
import { Spinner } from "react-bootstrap";

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
        const response = await axios.get<Menza[]>("/api/menza");
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
          <div key={menza.idMenza} className="card" style={{ width: "18rem" }}>
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
              <div className="button-container">
                <Link
                  to={`/menza/${menza.idMenza}`}
                  className="btn btn-primary"
                >
                  pogledaj
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;
