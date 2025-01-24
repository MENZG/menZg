import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import LoginForm from "./Components/LoginForm.tsx";
import ListaMenza from "./Components/ListaMenza.tsx";
import Profil from "./Components/Profil.tsx";
import Menza from "./Components/Menza.tsx";
import Korisnici from "./Components/Korisnici.tsx";
import Favoriti from "./Components/Favoriti.tsx";
import Chat3 from "./Components/Chat3.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login/student" />} />
        <Route path="/login" element={<Navigate to="/login/student" />} />
        <Route path="/login/student" element={<LoginForm />} />
        <Route path="/menze" element={<ListaMenza />} />
        <Route path="/favoriti" element={<Favoriti />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="menza/:id" element={<Menza />} />
        <Route path="korisnici" element={<Korisnici />} />
        <Route path="chat" element={<Chat3 />} />
      </Routes>
    </Router>
  );
}

export default App;
