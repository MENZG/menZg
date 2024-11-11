import "/src/styles/ListaEmployees.css";
import { useEffect, useState } from "react";
import axios from "axios";
//import "/src/styles/ListaMenza.css";

interface Menza {
  id: string;
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}

const ListaMenzaAdd = () => {
  const [menze, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    axios
      .get("/api/menze")
      .then((response) => {
        console.log("Full response:", response);
        console.log("response.data:", response.data);
        console.log("Dohvaćeni podaci:", response.data.menze);
        setMenze(response.data || []);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
        setMenze([]);
      });
  }, []);
  return (
    <div className="card-container-employees">
      <div className="card">
        <div className="card-header">Jadranka Radić</div>
        <div className="card-body">
          <p>Cvjetno naselje menza</p>
          <p>username: djelatnik1</p>
          <p>lozinka: 2468</p>
        </div>
      </div>
      {menze && menze.length > 0 ? (
        menze.map((menza) => (
          <div key={menza.id} className="card" style={{ width: "18rem" }}>
            <img
              src="/src/public/cvjetno.jpg"
              className="card-img-top"
              alt={`Slika menze ${menza.name}`}
            />
            <div className="card-body">
              <h5 className="card-title">{menza.name}</h5>
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
        ))
      ) : (
        <p>Nema dostupnih menzi. Odi na /admin/dodajMenzu i dodaj menzu.</p>
      )}
    </div>
  );
};

export default ListaMenzaAdd;
