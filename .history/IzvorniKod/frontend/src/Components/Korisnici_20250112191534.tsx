import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "/src/styles/Korisnici.css";

const apiUrl = import.meta.env.VITE_API_URL;

interface Korisnik {
  idKorisnik: string;
  username: string;
  lozinka: string;
  role: number;
  roleName: string;
  godine: number;
  spol: string;
}

const Korisnici = () => {
  const [korisnici, setData] = useState<Korisnik[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/korisnici`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDelete = (idKorisnik: string) => {
    axios
      .delete(`${apiUrl}/korisnici/${idKorisnik}`, { withCredentials: true })
      .then(() => {
        // Remove the deleted user from the state
        setData((prevData) =>
          prevData.filter((korisnik) => korisnik.idKorisnik !== idKorisnik)
        );
        console.log(`User with ID: ${idKorisnik} deleted successfully`);
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleBlock = (idKorisnik: string) => {
    axios
      .put(`${apiUrl}/korisnici/${idKorisnik}/blocked?blocked=true`, null, {
        withCredentials: true,
      })
      .then(() => {
        // Update the user's roleName or any other state change to reflect the blocked status
        setData((prevData) =>
          prevData.map((korisnik) =>
            korisnik.idKorisnik === idKorisnik
              ? { ...korisnik, roleName: "Blocked" }
              : korisnik
          )
        );
        console.log(`User with ID: ${idKorisnik} blocked successfully`);
      })
      .catch((error) => {
        console.error("There was an error blocking the user!", error);
      });
  };

  const handleUnblock = (idKorisnik: string) => {
    axios
      .put(`${apiUrl}/korisnici/${idKorisnik}/blocked?blocked=false`, null, {
        withCredentials: true,
      })
      .then(() => {
        // Update the user's roleName or any other state change to reflect the unblocked status
        setData((prevData) =>
          prevData.map((korisnik) =>
            korisnik.idKorisnik === idKorisnik
              ? { ...korisnik, roleName: "Active" } // Replace "Active" with the appropriate status
              : korisnik
          )
        );
        console.log(`User with ID: ${idKorisnik} unblocked successfully`);
      })
      .catch((error) => {
        console.error("There was an error unblocking the user!", error);
      });
  };

  return (
    <>
      <NavBar />
      <div className="korisnici-container">
        <h1 className="naslov">Lista Korisnika</h1>
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Role Name</th>
              <th>Godine</th>
              <th>Spol</th>
              <th>Delete</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map((korisnik) => (
              <tr key={korisnik.idKorisnik}>
                <td>{korisnik.idKorisnik}</td>
                <td>{korisnik.username}</td>
                <td>{korisnik.role}</td>
                <td>{korisnik.roleName}</td>
                <td>{korisnik.godine}</td>
                <td>{korisnik.spol}</td>
                <td>
                  {(korisnik.role === 1 || korisnik.role === 2) && (
                    <button onClick={() => handleDelete(korisnik.idKorisnik)}>
                      Delete User
                    </button>
                  )}
                </td>
                <td>
                  {korisnik.roleName === "Blocked" ? (
                    <button onClick={() => handleUnblock(korisnik.idKorisnik)}>
                      Unblock User
                    </button>
                  ) : (
                    <button onClick={() => handleBlock(korisnik.idKorisnik)}>
                      Block User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Korisnici;