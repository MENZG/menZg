import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";
import "/src/styles/AddMenza.css";

function AddMenza() {
  return (
    <>
      <NavBarAdmin />
      <div className="dodaj-menzu-container">
        <h2 className="h2">unesite podatke o novoj menzi</h2>
        <Form className="w-100" style={{ maxWidth: "400px" }}>
          <Form.Group className="mb-3">
            <Form.Control
              size="sm"
              type="text"
              placeholder="puni naziv menze"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="ulica"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control size="sm" type="text" placeholder="kućni broj" />
          </Form.Group>

          <h4>radno vrijeme radnim danom</h4>

          <Button variant="primary" type="submit" className="w-50 mb-3">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddMenza;
