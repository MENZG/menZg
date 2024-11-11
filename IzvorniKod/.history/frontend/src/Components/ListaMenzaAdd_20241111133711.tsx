import "/src/styles/ListaEmployees.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "/src/styles/ListaMenza.css";
import NavBarAdmin from "./NavBarAdmin";

interface Menza {
  id: string;
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}

const ListaMenza = () => {
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


const ListaMenzaAdd = () => {
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
    </div>
  );
};

export default ListaMenzaAdd;
