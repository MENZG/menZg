import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/login/admin");
  };

  const handleEmployeeLogin = () => {
    navigate("/login/employee");
  };

  return (
    <>
      <Form className="w-100" style={{ maxWidth: "400px" }}>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Label className="h5">Email address</Form.Label>
          <Form.Control size="lg" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="h5">Password</Form.Label>
          <Form.Control size="lg" type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Submit
        </Button>
      </Form>

      <div className="login-btn-containter">
        <Button onClick={handleAdminLogin} className="w-200 mb-2">
          Ja sam Admin
        </Button>
        <Button onClick={handleEmployeeLogin} className="w-200 mb-2">
          Ja sam Djelatnik
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
