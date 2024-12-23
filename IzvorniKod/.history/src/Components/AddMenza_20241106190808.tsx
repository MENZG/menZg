import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";

function AddMenza() {
  return (
    <>
      <NavBarAdmin />
      <Form className="w-100" style={{ maxWidth: "400px" }}>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Control size="lg" type="text" placeholder="puni naziv menze" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            size="lg"
            type="text"
            placeholder="ulica i kućni broj"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddMenza;
