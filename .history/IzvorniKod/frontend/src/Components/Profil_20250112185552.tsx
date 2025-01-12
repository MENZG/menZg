import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/Profile.css";

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
      const response = await axios.put(`/korisnici/${id}/newRole/${newRole}`);
      console.log("User role updated:", response.data);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  updateUserRole(3, 3);

  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="profile-container">
          <Image src={userToPrint.imageUrl} alt="Profile" roundedCircle />
          <h1 className="profile-name">{userToPrint.name}</h1>
          <p className="profile-email">{userToPrint.email}</p>
          <p className="profile-role">Role: {userToPrint.roleName}</p>
          <p className="profile-age">Age: {userToPrint.age}</p>
          <p className="profile-sex">Sex: {userToPrint.sex}</p>
        </div>
      )}
    </>
  );
};

export default Profil;
