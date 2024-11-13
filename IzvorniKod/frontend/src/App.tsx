import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import AdminLogin from "./Components/AdminLogin";
import EmployeeLogin from "./Components/EmployeeLogin";
import ListaMenza from "./Components/ListaMenza";
import Profil from "./Components/Profil";
import ListaMenzaAdmin from "./Components/ListaMenzaAdmin";
import AddMenza from "./Components/AddMenza";
import AddEmployee from "./Components/AddEmployee";
import ListaMenzaEmployee from "./Components/ListaMenzaEmployee";
import AddMeals from "./Components/AddMeals";
import AddWorkingHours from "./Components/AddWorkingHours";
import Menza from "./Components/Menza";

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
        <Route path="/djelatnik/dodajRadnoVrijeme" element={<AddWorkingHours />} />
        <Route path="/menze/:id" element={<Menza />} />
      </Routes>
    </Router>
  );
}

export default App;