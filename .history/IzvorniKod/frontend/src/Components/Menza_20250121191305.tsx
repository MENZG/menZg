import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/Menza.css";
import Chat from "./Chat";
import NavBar from "./NavBar";
import MuxPlayer from "@mux/mux-player-react";
import YouTubeLiveStream from "./YouTubeLiveStream";
import { MdLocationOn } from "react-icons/md";
import { TbUserHeart } from "react-icons/tb";
import { IoChatbubbleOutline, IoFastFoodOutline } from "react-icons/io5";
import { PiArmchair } from "react-icons/pi";
import { FaRegStar, FaStar } from "react-icons/fa6";

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
  radnaVremena: { dan: string; pocetak: string | null; kraj: string | null }[];
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

interface Ocjena {
  hrana: number;
  ljubaznost: number;
  ambijent: number;
  lokacija: number;
}

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

interface RatingStarsProps {
  category: keyof Ocjena;
  value: number;
  onChange: (category: keyof Ocjena, value: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  category,
  value,
  onChange,
}) => {
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={`${category}-${star}`}
          onMouseEnter={() => setHoveredValue(star)}
          onMouseLeave={() => setHoveredValue(0)}
          onClick={() => onChange(category, star)}
        >
          {star <= (hoveredValue || value) ? (
            <FaStar className="star filled" />
          ) : (
            <FaRegStar className="star" />
          )}
        </span>
      ))}
    </div>
  );
};

function Menza() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurantData, setRestaurantData] = useState<RestaurantData>(
    initialRestaurantData
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [korisnik, setKorisnik] = useState<Korisnik | null>(null);
  const [role, setRole] = useState<number>(1);
  const [editableTimes, setEditableTimes] = useState(
    initialRestaurantData.radnaVremena
  );
  const [editModeIndex, setEditModeIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [muxError, setMuxError] = useState<boolean>(false);
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false);
  const [ocjene, setOcjene] = useState<Ocjena | null>(null);
  const [rating, setRating] = useState<{
    hranaRating: number;
    ljubaznostRating: number;
    ambijentRating: number;
    lokacijaRating: number;
  }>({
    hranaRating: 0,
    ljubaznostRating: 0,
    ambijentRating: 0,
    lokacijaRating: 0,
  });

  const handleRatingChange = (
    category:
      | "hranaRating"
      | "ljubaznostRating"
      | "ambijentRating"
      | "lokacijaRating",
    value: number
  ) => {
    setRating((prevRating) => ({
      ...prevRating,
      [category]: value,
    }));
  };

  useEffect(() => {
    const fetchOcjene = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/menza/${restaurantData.idMenza}/prosjecna-ocjena`
        );
        const [hranaRating, ljubaznostRating, ambijentRating, lokacijaRating] =
          response.data; // Destructure the array
        setOcjene({
          hrana: hranaRating,
          ljubaznost: ljubaznostRating,
          ambijent: ambijentRating,
          lokacija: lokacijaRating,
        });
      } catch (error) {
        console.error("Error fetching ocjene data:", error);
      }
    };

    fetchOcjene();
  }, [restaurantData.idMenza]);

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
          const response = await axios.get(
            `${apiUrl}/korisnici/username/${currentUser.email}`
          );
          setKorisnik(response.data);
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
  }, [id]);

  const handleMuxError = () => {
    setMuxError(true);
  };

  const handleOcjeniMenzu = () => {
    setShowRatingForm(true);
  };

  const closeRatingForm = () => {
    setShowRatingForm(false);
  };

  const submitRating = async () => {
    if (!korisnik || !restaurantData) {
      alert("Korisnik ili menza nisu učitani.");
      return;
    }

    const payload = { ...rating };

    try {
      await axios.post(
        `${apiUrl}/menza/${restaurantData.idMenza}/${korisnik.idKorisnik}/rating`,
        payload
      );
      alert("Vaša ocjena je uspješno poslana!");
      setShowRatingForm(false);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Došlo je do pogreške prilikom slanja ocjene.");
    }
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
      <div
        className={`container ${showRatingForm || isChatOpen ? "blurred" : ""}`}
      >
        <Card className="menza-card">
          <Card.Img
            variant="top"
            src={`/slika_menza_${restaurantData.idMenza}.jpg`}
            alt={`Slika menze ${restaurantData.imeMenze}`}
          />
          <Card.Body>
            <Card.Title>{restaurantData.imeMenze}</Card.Title>
            <div className="location">
              <MdLocationOn />
              <span>{restaurantData.lokacija}</span>
            </div>
            <button onClick={handleOcjeniMenzu}>Ocijeni</button>
          </Card.Body>
        </Card>
        {showRatingForm && (
          <form>
            {Object.keys(rating).map((key) => (
              <div key={key}>
                <label>{key}</label>
                <RatingStars
                  category={key as keyof Ocjena}
                  value={rating[key as keyof typeof rating]}
                  onChange={handleRatingChange}
                />
              </div>
            ))}
            <button onClick={submitRating}>Spremi</button>
            <button onClick={closeRatingForm}>Zatvori</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Menza;
