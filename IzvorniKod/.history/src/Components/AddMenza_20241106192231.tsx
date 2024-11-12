import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";
import "/src/styles/AddMenza.css";

function AddMenza() {
  return (
    <>
      <NavBarAdmin />
      <div className="dodaj-menzu-container">
        <h6 className="inline">unesite podatke o novoj menzi</h6>
        <Form className="w-100" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3">
            <Form.Control
              size="lg"
              type="text"
              placeholder="puni naziv menze"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control size="lg" type="text" placeholder="ulica" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control size="lg" type="text" placeholder="kućni broj" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddMenza;
