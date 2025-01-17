import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./Routes/LoginForm.tsx";
import AdminLogin from "./Routes/AdminLogin.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeLogin from "./Routes/EmployeeLogin.tsx";
import ListaMenza from "./Components/ListaMenza.tsx";

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
      </Routes>
    </Router>
  );
}

export default App;
