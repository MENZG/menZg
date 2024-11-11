import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function LoginForm() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/login/admin");
  };

  const handleEmployeeLogin = () => {
    navigate("/login/employee");
  };

  return (
    <div className="login-form-container">
      <Form className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="login-title">Ulogiraj se!</h1>
        <Form.Group className="mb-4">
          <Form.Label className="login-label">E-mail</Form.Label>
          <Form.Control
            className="login-input"
            size="lg"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="login-label">Lozinka</Form.Label>
          <Form.Control
            className="login-input"
            size="lg"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button type="submit" className="login-submit-btn w-100 mb-4">
          Prijava
        </Button>
      </Form>

      <div className="login-btn-container">
        <span className="login-role-label">Prijava za:</span>
        <Button onClick={handleEmployeeLogin} className="role-btn">
          Djelatnik
        </Button>
        <Button onClick={handleAdminLogin} className="role-btn">
          Administrator
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
