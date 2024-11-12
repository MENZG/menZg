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
            <div className="card-header">{menza.name}</div>
            <div className="card-body">
              <p className="card-text">
                id: {menza.id} <br />
                Radno vrijeme: {menza.startTime} - {menza.endTime}
              </p>
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
