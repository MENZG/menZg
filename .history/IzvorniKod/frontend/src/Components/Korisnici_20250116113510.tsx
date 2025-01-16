import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "/src/styles/Korisnici.css";
import { PiStudent } from "react-icons/pi";
import { LuChefHat } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";

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
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set()); // New state for tracking blocked users
  const [roleFilter, setRoleFilter] = useState<number | null>(null); // Null = sve role
  const [genderFilter, setGenderFilter] = useState<string | null>(null); // Null = svi spolovi
  const [showBlocked, setShowBlocked] = useState(false); // False = prikaz svih korisnika

  useEffect(() => {
    axios
      .get(`${apiUrl}/korisnici`)
      .then((response) => {
        setKorisnici(response.data);

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

  const filteredKorisnici = korisnici.filter((korisnik) => {
    if (roleFilter !== null && korisnik.role !== roleFilter) return false;
    if (genderFilter && korisnik.spol !== genderFilter) return false;
    if (showBlocked && !blockedUsers.has(korisnik.idKorisnik)) return false;
    return true;
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/korisnici`)
      .then((response) => {
        setKorisnici(response.data);

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
        setKorisnici((prevData) =>
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
      setKorisnici((prevData) =>
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
        <div className="filter-section">
          <h2>Filteri</h2>
          <div className="filter-row">
            <label>Uloga:</label>
            <select
              value={roleFilter ?? ""}
              onChange={(e) =>
                setRoleFilter(e.target.value ? parseInt(e.target.value) : null)
              }
            >
              <option value="">Sve role</option>
              <option value={1}>Student</option>
              <option value={2}>Zaposlenik</option>
              <option value={3}>Admin</option>
            </select>
          </div>
          <div className="filter-row">
            <label>Spol:</label>
            <select
              value={genderFilter ?? ""}
              onChange={(e) => setGenderFilter(e.target.value || null)}
            >
              <option value="">Svi spolovi</option>
              <option value="M">Muški</option>
              <option value="Ž">Ženski</option>
            </select>
          </div>
          <div className="filter-row">
            <label>
              <input
                type="checkbox"
                checked={showBlocked}
                onChange={(e) => setShowBlocked(e.target.checked)}
              />
              Prikaz blokiranih korisnika
            </label>
          </div>
        </div>
        <div className="table-responsive">
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
              {filteredKorisnici.map((korisnik) => (
                <tr
                  key={korisnik.idKorisnik}
                  className={
                    blockedUsers.has(korisnik.idKorisnik) ? "blocked-row" : ""
                  }
                >
                  <td className="ikona-cell">
                    {korisnik.role === 1 ? (
                      <PiStudent />
                    ) : korisnik.role === 2 ? (
                      <LuChefHat />
                    ) : (
                      <GrUserAdmin />
                    )}
                  </td>
                  <td>{korisnik.idKorisnik}</td>
                  <td>{korisnik.username}</td>
                  <td>
                    <select
                      value={korisnik.role}
                      onChange={(e) => {
                        const newRole = parseInt(e.target.value, 10);
                        updateUserRole(
                          parseInt(korisnik.idKorisnik, 10),
                          newRole
                        );
                      }}
                    >
                      <option value={1}>Student</option>
                      <option value={2}>Zaposlenik</option>
                      <option value={3}>Admin</option>
                    </select>
                  </td>
                  <td>{korisnik.godine}</td>
                  <td>{korisnik.spol}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(korisnik.idKorisnik)}
                      className="admin-btn"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {blockedUsers.has(korisnik.idKorisnik) ? (
                      <button
                        onClick={() => handleUnblock(korisnik.idKorisnik)}
                        className="admin-btn"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(korisnik.idKorisnik)}
                        className="admin-btn"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Korisnici;
