import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Image from "react-bootstrap/Image";
import { Form } from "react-bootstrap";
import "../styles/Profile.css";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

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

const Profil = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [korisnik, setKorisnik] = useState<Korisnik | null>(null);
  const [userToPrint, setUserToPrint] = useState({
    imageUrl: "",
    name: "",
    email: "",
    roleName: "",
    age: 0,
    sex: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSex, setSelectedSex] = useState(userToPrint.sex);
  const [age, setAge] = useState(userToPrint.age);
  const [isSexSelected, setIsSexSelected] = useState(false);

  const handleSexChange = (eventKey: string | null) => {
    setSelectedSex(eventKey ?? "");
    setIsSexSelected(true);
  };

  interface AgeChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleAgeChange = (e: AgeChangeEvent) => {
    setAge(Number(e.target.value));
  };

  const toggleEditMode = () => {
    if (isEditMode && !isSexSelected) {
      alert("Potrebno je upisati valjane vrijednosti!");
      return;
    }
    if (isEditMode) {
      const updateUser = async () => {
        if (korisnik) {
          try {
            await axios.put(`${apiUrl}/korisnici/${korisnik.idKorisnik}`, {
              username: korisnik.username,
              lozinka: "",
              spol: selectedSex,
              godine: age,
            });
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        }
      };

      updateUser();

      userToPrint.sex = selectedSex;
      userToPrint.age = age;
    }
    setIsEditMode(!isEditMode);
  };

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
    if (currentUser && korisnik) {
      const updatedUser = { ...userToPrint };
      updatedUser.imageUrl = currentUser.picture;
      updatedUser.name = currentUser.name;
      updatedUser.email = currentUser.email;
      updatedUser.roleName = korisnik.roleName;
      updatedUser.age = korisnik.godine;
      updatedUser.sex = korisnik.spol;
      setUserToPrint(updatedUser);
      console.log(updatedUser);
    }
  }, [korisnik]);

  const updateUserRole = async (id: number, newRole: number) => {
    try {
      const response = await axios.put(
        `${apiUrl}/korisnici/${id}/newRole/${newRole}`
      );
      console.log("User role updated:", response.data);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  updateUserRole(3, 2);

  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="profile-page">
          <div className="profile-container">
            <div className="profile-header">
              <Image
                src={userToPrint.imageUrl}
                alt="Profile Picture"
                roundedCircle
                className="profile-picture"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "./avatar.png";
                }}
              />
              <h1 className="profile-name">{userToPrint.name}</h1>
            </div>
            <div className="profile-details">
              <p className="profile-email">{userToPrint.email}</p>
              <p className="profile-role">Role: {userToPrint.roleName}</p>
              <p className="profile-age">
                Godine:{" "}
                {isEditMode ? (
                  <Form.Control
                    type="number"
                    value={age}
                    onChange={handleAgeChange}
                    className="age-input"
                    size="sm"
                  />
                ) : (
                  userToPrint.age || "nedefinirano"
                )}
              </p>
              <div className="profile-sex">
                Spol:{" "}
                {isEditMode ? (
                  <DropdownButton
                    as={ButtonGroup}
                    id="dropdown-button-drop-sex"
                    size="sm"
                    title={selectedSex}
                    onSelect={handleSexChange}
                  >
                    <Dropdown.Item eventKey="Muški">Muški</Dropdown.Item>
                    <Dropdown.Item eventKey="Ženski">Ženski</Dropdown.Item>
                    <Dropdown.Item eventKey="Ostalo">Ostalo</Dropdown.Item>
                  </DropdownButton>
                ) : (
                  userToPrint.sex || "nedefinirano"
                )}
              </div>
            </div>
            <div className="profile-dropdown">
              <button onClick={toggleEditMode}>
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
