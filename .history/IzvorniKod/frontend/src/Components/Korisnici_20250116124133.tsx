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
  roleName: string;
  godine: number;
  spol: string;
}

const Korisnici = () => {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [filteredKorisnici, setFilteredKorisnici] = useState<Korisnik[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const [selectedRole, setSelectedRole] = useState<string>(""); // Role filter
  const [selectedGender, setSelectedGender] = useState<string>(""); // Gender filter
  const [showBlockedOnly, setShowBlockedOnly] = useState<boolean>(false); // Blocked filter

  useEffect(() => {
    axios
      .get(`${apiUrl}/korisnici`)
      .then((response) => {
        setKorisnici(response.data);
        setFilteredKorisnici(response.data);

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

  const applyFilters = () => {
    setFilteredKorisnici(
      korisnici.filter((korisnik) => {
        const roleMatch =
          selectedRole === "" || korisnik.role.toString() === selectedRole;
        const genderMatch =
          selectedGender === "" || korisnik.spol === selectedGender;
        const blockedMatch =
          !showBlockedOnly || blockedUsers.has(korisnik.idKorisnik);
        return roleMatch && genderMatch && blockedMatch;
      })
    );
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRole, selectedGender, showBlockedOnly]);

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
        <div className="naslov-div">
          <h1 className="naslov">Lista Korisnika</h1>
          <div className="filters">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="filter-select"
            >
              <option value="">Svi role</option>
              <option value="1">Student</option>
              <option value="2">Zaposlenik</option>
              <option value="3">Admin</option>
            </select>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="filter-select"
            >
              <option value="">Svi spolovi</option>
              <option value="Muški">Muški</option>
              <option value="Ženski">Ženski</option>
            </select>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={showBlockedOnly}
                onChange={(e) => setShowBlockedOnly(e.target.checked)}
              />
              Prikaži samo blokirane korisnike
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
                  <td className="ikona-cell" data-label="Ikona">
                    <div className="ikona">
                      {korisnik.role === 1 ? (
                        <PiStudent />
                      ) : korisnik.role === 2 ? (
                        <LuChefHat />
                      ) : (
                        <GrUserAdmin />
                      )}
                    </div>
                  </td>
                  <td data-label="ID">{korisnik.idKorisnik}</td>
                  <td data-label="Username">{korisnik.username}</td>
                  <td data-label="Role">
                    <select
                      value={korisnik.role}
                      className="select-role"
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
                  <td data-label="Godine">{korisnik.godine}</td>
                  <td data-label="Spol">{korisnik.spol}</td>
                  <td data-label="Delete">
                    {(korisnik.role === 1 || korisnik.role === 2) && (
                      <button
                        onClick={() => handleDelete(korisnik.idKorisnik)}
                        className="admin-btn"
                      >
                        Delete User
                      </button>
                    )}
                  </td>
                  <td data-label="Block">
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
      </div>
    </>
  );
};

export default Korisnici;
