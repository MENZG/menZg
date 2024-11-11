import React from "react";
import axios from "axios";
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

  const handleGoogleLogin = () => {
    navigate("/menze");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const password = form.elements.namedItem("password") as HTMLInputElement;

    try {
      const response = await axios.post("http://localhost:8080/api/student", {
        email: email.value,
        password: password.value,
      });
      console.log(response.data);
      // Handle successful login
    } catch (error) {
      console.error("Error logging in", error);
      // Handle login error
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <Form
          className="w-100"
          style={{ maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="login-title">Ulogiraj se!</h1>
          <Form.Group className="mb-4">
            <Form.Label className="login-label">E-mail</Form.Label>
            <Form.Control
              className="login-input"
              size="lg"
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="login-label">Lozinka</Form.Label>
            <Form.Control
              className="login-input"
              size="lg"
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Button type="submit" className="login-submit-btn w-100 mb-4">
            Prijava
          </Button>

          <Button onClick={handleGoogleLogin}>GOOGLE</Button>
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
    </div>
  );
}

export default LoginForm;
