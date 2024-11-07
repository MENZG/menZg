import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";

function AddMenza() {
  return (
    <>
      <NavBarAdmin />
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
    </>
  );
}

export default AddMenza;
