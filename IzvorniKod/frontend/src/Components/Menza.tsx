import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/Menza.css";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import YouTubeLiveStream from "./YoutubeLiveStream";
import { use } from "video.js/dist/types/tech/middleware";

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

interface RestaurantData {
  idMenza: string;
  imeMenze: string;
  lokacija: string;
  radnaVremena: { dan: string; pocetak: string; kraj: string }[];
}

interface User {
  name: string;
  picture: string;
  email: string;
}

interface Korisnik {
  idKorisnik: number;
  username: string;
  role: number;
  godine: number;
  spol: string;
  blocked: boolean;
  roleName: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

function Menza() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState<RestaurantData>(
    initialRestaurantData
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [korisnik, setKorisnik] = useState<Korisnik | null>(null);
  const [role, setRole] = useState(1);
  const [editableTimes, setEditableTimes] = useState(
    restaurantData.radnaVremena
  );
  const [editModeIndex, setEditModeIndex] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/korisnici/user`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      const fetchKorisnik = async () => {
        try {
          const response1 = await axios.get(
            `${apiUrl}/korisnici/username/${currentUser.email}`
          );
          setKorisnik(response1.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchKorisnik();
    }
  }, [currentUser]);

  useEffect(() => {
    if (korisnik) {
      setRole(korisnik.role);
    }
  }, [korisnik]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/menza/${id}`);

        setRestaurantData(response.data);
        setLoading(false);
        console.log(restaurantData);
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

  const handleTimeChange = (index, field, value) => {
    const updatedTimes = [...editableTimes];
    updatedTimes[index][field] = value;
    setEditableTimes(updatedTimes);
  };

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  const toggleEditMode = (index) => {
    setEditModeIndex(editModeIndex === index ? null : index);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <Card>
          <Card.Img
            variant="top"
            src={`/slika_menza_${restaurantData.idMenza}.jpg`}
            alt={`Slika menze ${restaurantData.imeMenze}`}
            style={{ height: "35vh" }}
          />
          <Card.Body>
            <Card.Header className="header">
              <Card.Title>{restaurantData.imeMenze}</Card.Title>
              <div className="location">
                <img
                  src="/locationPin2.png"
                  alt="location pin"
                  className="location-pin-img"
                />
                <Card.Text>
                  <strong>Adresa:</strong> {restaurantData.lokacija}
                </Card.Text>
              </div>
            </Card.Header>

            <div className="working-hours">
              <h4>Radno vrijeme</h4>

              <ListGroup variant="flush">
                {editableTimes.map((time, index) => (
                  <ListGroup.Item key={index} className="list-group-item">
                    {time.dan}:{" "}
                    {editModeIndex === index ? (
                      <>
                        <Form.Control
                          type="text"
                          value={time.pocetak}
                          onChange={(e) =>
                            handleTimeChange(index, "pocetak", e.target.value)
                          }
                          placeholder="Početak"
                        />
                        {" - "}
                        <Form.Control
                          type="text"
                          value={time.kraj}
                          onChange={(e) =>
                            handleTimeChange(index, "kraj", e.target.value)
                          }
                          placeholder="Kraj"
                        />
                        <Button
                          variant="primary"
                          onClick={() => toggleEditMode(index)}
                          className="float-right"
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        {time.pocetak && time.kraj
                          ? `${time.pocetak} - ${time.kraj}`
                          : "Ne radi"}
                        {role === 1 && (
                          <Button
                            variant="primary"
                            onClick={() => toggleEditMode(index)}
                            className="float-right"
                          >
                            <FontAwesomeIcon icon={faPaintBrush} />
                          </Button>
                        )}
                      </>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>

        {/* <div className="live-stream">
          <h4>Uživo red u menzi</h4>
          <div className="video-container">
            <YouTubeLiveStream videoId="wBVq_Qoegmo"></YouTubeLiveStream>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Menza;
