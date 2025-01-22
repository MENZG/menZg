import NavBar from "./NavBar";
import { Button, Form } from "react-bootstrap";
import "/src/styles/AddEmployee.css";
import ListaEmployees from "./ListaEmployees";

const AddEmployee = () => {
  return (
    <>
      <NavBar />
      <div className="dodaj-djelatnika-container">
        <h2 className="h2">unesite podatke o djelatniku</h2>
        <Form className="w-100" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="name"
              placeholder="ime"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="last-name"
              placeholder="prezime"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="naziv radnog mjesta (menze)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="jedinstveno korisničko ime"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="lozinka"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-50 mb-3">
            dodaj
          </Button>
        </Form>
        <ListaEmployees />
      </div>
    </>
  );
};

export default AddEmployee;
