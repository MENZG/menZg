import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";

// Tipiziranje podataka o menzama
interface Menza {
  id: string;
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}

const ListaMenza = () => {
  const [menze, setMenze] = useState<Menza[]>([]); // State za pohranu menzi

  // Dohvati podatke o menzama s API-a
  useEffect(() => {
    axios
      .get("/api/menze") // API poziv za dohvat menzi
      .then((response) => {
        console.log("Dohvaćene menze:", response.data.menze);
        setMenze(response.data.menze); // Postavljanje menzi u state
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
      });
  }, []); // Ovaj useEffect će se pozvati samo jednom kada se komponenta učita

  return (
    <>
      <NavBar />
      <div className="card-container">
        {menze.map((menza) => (
          <div key={menza.id} className="card" style={{ width: "18rem" }}>
            <img
              src="/src/public/cvjetno.jpg" // Možeš postaviti default sliku ili dodati URL u menza podatke
              className="card-img-top"
              alt={`Slika menze ${menza.name}`}
            />
            <div className="card-body">
              <h5 className="card-title">{menza.name}</h5>
              <p className="card-text">
                {menza.ulica}, {menza.broj}
              </p>
              <p className="card-text">
                Radno vrijeme: {menza.startTime} - {menza.endTime}
              </p>
              <div className="button-container">
                <a href="#" className="btn btn-primary">
                  pogledaj
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaMenza;
