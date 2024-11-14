import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Menza.css";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";

//test data
const initialRestaurantData = {
  idMenza: "1",
  imeMenze: "Default Restaurant",
  lokacija: "Default Location",
  radnaVremena: [
    { dan: "Monday", pocetak: "08:00", kraj: "20:00" },
    { dan: "Tuesday", pocetak: "08:00", kraj: "20:00" },
    { dan: "Wednesday", pocetak: "08:00", kraj: "20:00" },
    { dan: "Thursday", pocetak: "08:00", kraj: "20:00" },
    { dan: "Friday", pocetak: "08:00", kraj: "20:00" },
    { dan: "Saturday", pocetak: "08:00", kraj: "20:00" },
  ],
};

const formatTime = (time: string | null) => {
  return time ? time.split(":").slice(0, 2).join(":") : "Ne radi";
};

function Menza() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  interface RestaurantData {
    idMenza: string;
    imeMenze: string;
    lokacija: string;
    radnaVremena: { dan: string; pocetak: string; kraj: string }[];
  }

  const [restaurantData, setRestaurantData] = useState<RestaurantData>(
    initialRestaurantData
  );

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`/api/menza/${id}`);
        setRestaurantData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant data", error);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  const formatTime = (time: string | null) => {
    if (!time) return "N/A";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <>
      <NavBar />

      <Card>
        <Card.Img
          variant="top"
          src={`/slika_menza_${restaurantData.idMenza}.jpg`}
          alt={`Slika menze ${restaurantData.imeMenze}`}
        />
        <Card.Body>
          <Card.Title>{restaurantData.imeMenze}</Card.Title>
          <Card.Text>
            <strong>Adresa:</strong> {restaurantData.lokacija}
          </Card.Text>
          <div className="working-hours">
            <h5>Radno vrijeme</h5>
            <ListGroup variant="flush">
              {restaurantData.radnaVremena.map((time, index) => (
                <ListGroup.Item key={index}>
                  {time.dan}: {formatTime(time.pocetak)} -{" "}
                  {formatTime(time.kraj)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Menza;
