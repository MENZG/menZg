import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css"
import LoginForm from "./Components/LoginForm.tsx";
import AdminLogin from "./Components/AdminLogin.tsx";
import EmployeeLogin from "./Components/EmployeeLogin.tsx";
import ListaMenza from "./Components/ListaMenza.tsx";
import Profil from "./Components/Profil.tsx";
import ListaMenzaAdmin from "./Components/ListaMenzaAdmin.tsx";
import AddMenza from "./Components/AddMenza.tsx";
import AddEmployee from "./Components/AddEmployee.tsx";
import ListaMenzaEmployee from "./Components/ListaMenzaEmployee.tsx";
import AddMeals from "./Components/AddMeals.tsx";
import AddWorkingHours from "./Components/AddWorkingHours.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login/student" />} />
        <Route path="/login" element={<Navigate to="/login/student" />} />
        <Route path="/login/student" element={<LoginForm />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/menze" element={<ListaMenza />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/admin/menze" element={<ListaMenzaAdmin />} />
        <Route path="/admin/dodajMenzu" element={<AddMenza />} />
        <Route path="/admin/dodajDjelatnika" element={<AddEmployee />} />
        <Route path="/djelatnik/menze" element={<ListaMenzaEmployee />} />
        <Route path="/djelatnik/dodajJelovnik" element={<AddMeals />} />
        <Route
          path="/djelatnik/dodajRadnoVrijeme"
          element={<AddWorkingHours />}
        />
        <Route path="/home" element={<ListaMenza />} />
      </Routes>
    </Router>
  );
}

export default App;
