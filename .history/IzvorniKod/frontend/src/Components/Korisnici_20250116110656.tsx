import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "/src/styles/Korisnici.css";
import { PiStudent } from "react-icons/pi";
import { LuChefHat } from "react-icons/lu";

const apiUrl = import.meta.env.VITE_API_URL;

interface Korisnik {
  idKorisnik: string;
  username: string;
  lozinka: string;
  role: number;
  roleName: string; // Keep roleName for display purposes
  godine: number;
  spol: string;
}

const Korisnici = () => {
  const [korisnici, setData] = useState<Korisnik[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set()); // New state for tracking blocked users

  useEffect(() => {
    axios
      .get(`${apiUrl}/korisnici`)
      .then((response) => {
        setData(response.data);

        const initialBlocked: Set<string> = new Set(
          response.data
            .filter((korisnik: Korisnik) => korisnik.roleName === "Blocked")
            .map((korisnik: Korisnik) => korisnik.idKorisnik)
        );
        setBlockedUsers(initialBlocked);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDelete = (idKorisnik: string) => {
    axios
      .delete(`${apiUrl}/korisnici/${idKorisnik}`, { withCredentials: true })
      .then(() => {
        setData((prevData) =>
          prevData.filter((korisnik) => korisnik.idKorisnik !== idKorisnik)
        );
        setBlockedUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(idKorisnik);
          return updated;
        });
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
        setBlockedUsers((prev) => new Set(prev).add(idKorisnik));
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
        setBlockedUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(idKorisnik);
          return updated;
        });
        console.log(`User with ID: ${idKorisnik} unblocked successfully`);
      })
      .catch((error) => {
        console.error("There was an error unblocking the user!", error);
      });
  };

  const updateUserRole = async (id: number, newRole: number) => {
    try {
      await axios.put(`${apiUrl}/korisnici/${id}/newRole/${newRole}`);
      setData((prevData) =>
        prevData.map((korisnik) =>
          korisnik.idKorisnik === id.toString()
            ? { ...korisnik, role: newRole }
            : korisnik
        )
      );
      console.log(`User role updated successfully for user ID: ${id}`);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="korisnici-container">
        <div className="naslov-div">
          <h1 className="naslov">Lista Korisnika</h1>
        </div>
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>Ikona</th>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Godine</th>
              <th>Spol</th>
              <th>Delete</th>
              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {korisnici.map((korisnik) => (
              <tr
                key={korisnik.idKorisnik}
                className={
                  blockedUsers.has(korisnik.idKorisnik) ? "blocked-row" : ""
                }
              >
                { korisnik.role === 1 ? (<td><PiStudent />
                  </td>
) : ({ korisnik.role === 2 ? (<td><LuChefHat />
</td>) :(<td><GrUserAdmin />
  </td>)})}
                <td>{korisnik.idKorisnik}</td>
                <td>{korisnik.username}</td>
                <td>
                  <select
                    value={korisnik.role}
                    className="select-role"
                    onChange={(e) => {
                      const newRole = parseInt(e.target.value, 10);
                      updateUserRole(
                        parseInt(korisnik.idKorisnik, 10),
                        newRole
                      );
                      window.location.reload();
                    }}
                  >
                    <option value={1} className="option-role">
                      Student
                    </option>
                    <option value={2}>Zaposlenik</option>
                    <option value={3}>Admin</option>
                  </select>
                </td>
                <td>{korisnik.godine}</td>
                <td>{korisnik.spol}</td>
                <td>
                  {(korisnik.role === 1 || korisnik.role === 2) && (
                    <button
                      onClick={() => handleDelete(korisnik.idKorisnik)}
                      className="admin-btn"
                    >
                      Delete User
                    </button>
                  )}
                </td>
                <td>
                  {blockedUsers.has(korisnik.idKorisnik) ? (
                    <button
                      onClick={() => handleUnblock(korisnik.idKorisnik)}
                      className="admin-btn"
                    >
                      Unblock User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(korisnik.idKorisnik)}
                      className="admin-btn"
                    >
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
