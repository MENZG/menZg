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
        <h5>Ulogiraj se!</h5>
        <Form.Group className="mb-5">
          <Form.Label className="h5">Email address</Form.Label>
          <Form.Control size="lg" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="h5">Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Submit
        </Button>
      </Form>

      <div className="login-btn-containter">
        <Button onClick={handleAdminLogin} className="btn-secondary">
          Administrator
        </Button>
        <Button onClick={handleEmployeeLogin} className="btn-secondary">
          Djelatnik
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
