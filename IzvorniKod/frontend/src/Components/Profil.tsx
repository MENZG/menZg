import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/Profile.css";

const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  name: string;
  picture: string;
  email: string;
}

interface Korisnik {
  idKorisnik: string;
  username: string;
  lozinka: string;
  role: number;
  roleName: string;
  godine: number;
  spol: string;
}

const Profil = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Korisnik[]>([]);
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
        const response1 = await axios.get(`${apiUrl}/korisnici`);
        setUsers(response1.data);
        const response2 = await axios.get(`${apiUrl}/korisnici/user`);
        setCurrentUser(response2.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updatedUser = { ...userToPrint };
    if (currentUser) {
      const filteredUser = users.find(
        (user) => user.username === currentUser.email
      );

      updatedUser.imageUrl = currentUser.picture;
      updatedUser.name = currentUser.name;
      updatedUser.email = currentUser.email;
      updatedUser.age = filteredUser?.godine ?? 0;
      updatedUser.sex = filteredUser?.spol ?? "";
      if (filteredUser) {
        switch (filteredUser.role) {
          case 1:
            updatedUser.roleName = "Student";
            break;
          case 2:
            updatedUser.roleName = "Employee";
            break;
          case 3:
            updatedUser.roleName = "Admin";
            break;
          default:
            updatedUser.roleName = "";
        }
      }
    }
    setUserToPrint(updatedUser);
  }, [currentUser, users]);

  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="profile-container">
          <Image
            src={userToPrint.imageUrl}
            alt="Profile"
            onError={(e) => console.error("Error loading image:", e)}
            roundedCircle
          />
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
