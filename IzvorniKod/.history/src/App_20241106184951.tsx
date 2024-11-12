import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./Components/LoginForm.tsx";
import AdminLogin from "./Components/AdminLogin.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeLogin from "./Components/EmployeeLogin.tsx";
import ListaMenza from "./Components/ListaMenza.tsx";
import Profil from "./Components/Profil.tsx";
import AddMenza from "./Components/AddMenza.tsx";
import AddEmployee from "./Components/AddEmployee.tsx";

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
        <Route path="/admin/menze" element={<ListaMenza />} />
        <Route path="/admin/dodajMenzu" element={<AddMenza />} />
        <Route path="/admin/dodajDjelatnika" element={<AddEmployee />} />
        <Route path="/djelatnik/menze" element={<ListaMenza />} />
        <Route path="/djelatnik/dodajJelovnik" element={<AddMeals />} />
        <Route path="/djelatnik/menze" element={<AddWorkingHours />} />
      </Routes>
    </Router>
  );
}

export default App;
