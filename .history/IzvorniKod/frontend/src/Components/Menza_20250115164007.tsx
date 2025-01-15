import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/Menza.css";
import Chat from "./Chat";
import NavBar from "./NavBar";
import YouTubeLiveStream from "./YouTubeLiveStream";
import MuxPlayer from "@mux/mux-player-react";

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
axios.defaults.withCredentials = true;

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const streamStart = () => {
      try {
        const response = axios.post(`${apiUrl}/stream/start`);
      } catch (error) {}
    };

    streamStart();
  }, []);

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
      } catch (error) {
        console.error("Error fetching restaurant data", error);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  useEffect(() => {
    const formatTimeWithoutSeconds = (time: string | null) => {
      if (!time) return null;
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
    };

    const formattedRadnaVremena = restaurantData.radnaVremena.map((time) => ({
      ...time,
      pocetak: formatTimeWithoutSeconds(time.pocetak),
      kraj: formatTimeWithoutSeconds(time.kraj),
    }));

    setEditableTimes(formattedRadnaVremena);
  }, [restaurantData]);

  const formatTime = (time: string | null) => {
    if (!time) return "N/A";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = ({ index, field, value }: any) => {
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

  const toggleEditMode = (index: any) => {
    setEditModeIndex(editModeIndex === index ? null : index);
  };

  const validateTimeFormat = (time: string) => {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
  };

  const handleSaveTime = (index: number) => {
    const time = editableTimes[index];
    if (time.pocetak === "" && time.kraj === "") {
      toggleEditMode(index);

      axios
        .put(`${apiUrl}/menza/${id}/radno-vrijeme`, {
          dan: time.dan,
          pocetak: null,
          kraj: null,
        })
        .then((response) => {
          console.log("Time updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Error updating time", error);
        });
    } else if (
      validateTimeFormat(time.pocetak) &&
      validateTimeFormat(time.kraj)
    ) {
      toggleEditMode(index);

      axios
        .put(`${apiUrl}/menza/${id}/radno-vrijeme`, {
          dan: time.dan,
          pocetak: time.pocetak,
          kraj: time.kraj,
        })
        .then((response) => {
          console.log("Time updated successfully", response.data);
        })
        .catch((error) => {
          console.error("Error updating time", error);
        });
    } else {
      alert("Format unosa hh:mm ili ostavite oba inputa prazna za neradni dan");
    }
  };

  return (
    <>
      <NavBar />
      <div className={`container ${isChatOpen ? "blurred" : ""}`}>
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
                          onClick={() => handleSaveTime(index)}
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
                        {role === 2 && (
                          <Button
                            variant="primary"
                            onClick={() => toggleEditMode(index)}
                            className="float-right paint-brush"
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

        <div className="live-stream">
          <h4>Uživo red u menzi</h4>
          <div className="video-container">
            {/*<YouTubeLiveStream videoId="wBVq_Qoegmo"></YouTubeLiveStream>*/}
            <MuxPlayer
              streamType="live"
              playbackId="RBm68dXx7KP9dIw1DYVipDX9zz8QmUqt01YtDoYP4kcU"
              metadataVideoTitle="Placeholder (optional)"
              metadata-viewer-user-id="Placeholder (optional)"
              primary-color="#ffffff"
              secondary-color="#000000"
              accent-color="#fa50b5"
            />
          </div>
        </div>
      </div>
      <button className="open-chat-btn" onClick={() => setIsChatOpen(true)}>
        Open Chat
      </button>
      {isChatOpen && (
        <div className="chat-popup">
          <Chat />
          <button
            className="close-chat-btn"
            onClick={() => setIsChatOpen(false)}
          >
            Close
          </button>
        </div>
      )}{" "}
    </>
  );
}

export default Menza;
