import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/login/admin");
  };

  const handleEmployeeLogin = () => {
    navigate("/login/employee")
  }

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center p-0 position-relative"
    >
      <Row className="w-100 justify-content-center m-0">
        <Col xs={10} md={12} lg={12} className="d-flex justify-content-center">
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
        </Col>
      </Row>

      <div className="position-absolute w-100" style={{ bottom: "20px" }}>
        <Row className="w-100 justify-content-center m-0">
          <Col
            xs={6}
            md={4}
            lg={2}
            className="d-flex flex-column align-items-center"
          >
            <Button
              variant="link"
              onClick={handleAdminLogin}
              className="w-100 mb-2"
            >
              Ja sam Admin
            </Button>
            <Button variant="link" onClick={handleEmployeeLogin} className="w-100">
              Ja sam Djelatnik
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default LoginForm;
