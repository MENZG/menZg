import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "/src/styles/ListaMenza.css";
import { Menza } from "../types.ts";

const daysOfWeek = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Ä�etvrtak",
  "Petak",
  "Subota",
];

const formatTime = (time: string) => {
  return time ? time.split(":").slice(0, 2).join(":") : "Ne radi";
};

const ListaMenza = () => {
  const [menze, setMenze] = useState<Menza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenze = async () => {
      try {
        const response = await axios.get<Menza[]>("/api/menza");
        console.log("response.data: ", response.data);
        setMenze(response.data);
      } catch (error) {
        console.error("Greška pri dohvaćanju menzi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenze();
  }, []);

  if (loading) return <p>Učitavanje menzi...</p>;

  const today = new Date().getDay();
  const todayName = daysOfWeek[today];
  return (
    <>
      <NavBar />
      <div className="card-container">
        {menze.map((menza) => (
          <div key={menza.idMenza} className="card">
            <img
              src="/src/public/cvjetno.jpg"
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
                      {rv.dan}: {rv.pocetak ? rv.pocetak : "Ne radi"} -{" "}
                      {rv.kraj ? rv.kraj : "Ne radi"}
                    </div>
                  ))}
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

/*interface Menza {
  id: string;
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}*/
/*
const ListaMenza = () => {
  const [, setMenze] = useState<Menza[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/menza/1")
      .then((response) => {
        console.log("Full response:", response);
        console.log("response.data:", response.data);
        setMenze(response.data.menze || []);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
        setMenze([]);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="card-container">
        {/* {menze && menze.length > 0 ? (
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
        )} */

{
  /*<div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/cvjetno.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Cvjetno naselje</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>
            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/sc.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          {/*<button className="fav-btn">*</button>*/
}
{
  /*<div className="card-body">
            <h5 className="card-title">Menza SC</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/radic.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Stjepan Radić</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/cvjetno.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Cassandra</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/filozofski.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Filozofski</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/cvjetno.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Cvjetno naselje</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>
            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/sc.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          {/*<button className="fav-btn">*</button>*/
}
{
  /*<div className="card-body">
            <h5 className="card-title">Menza SC</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/radic.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Stjepan Radić</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/cvjetno.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Cassandra</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/src/public/filozofski.jpg"
            className="card-img-top"
            alt="Card top image"
          />
          <div className="card-body">
            <h5 className="card-title">Menza Filozofski</h5>
            <p className="card-text">Radno vrijeme: 7:00 - 21:00</p>

            <div className="button-container">
              <a href="#" className="btn btn-primary">
                pogledaj
              </a>
            </div>
          </div>
        </div>*/
}
{
  /*</div>
    </>
  );
};*/
}

export default ListaMenza;
