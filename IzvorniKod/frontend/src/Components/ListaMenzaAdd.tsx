import axios from "axios";
import { useEffect, useState } from "react";
import "/src/styles/ListaEmployees.css";
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
      .get("/menze")
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
      {menze && menze.length > 0 ? (
        menze.map((menza) => (
          <div key={menza.id} className="card" style={{ width: "18rem" }}>
            <div className="card-header">{menza.name}</div>
            <div className="card-body">
              <p>id: {menza.id} </p>
              <p>
                Adresa: {menza.ulica} {menza.broj}
              </p>

              <p>
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
