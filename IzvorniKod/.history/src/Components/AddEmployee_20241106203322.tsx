import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";

const AddEmployee = () => {
  return (
    <>
      <NavBarAdmin />
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
              placeholder="jedinstveno korisničko ime"
            />
          </Form.Group>

          <Form.Control
            className="form-control"
            type="text"
            placeholder="jedinstveno korisničko ime"
          />

          <h4 className="h4">radno vrijeme radnim danom</h4>
          <div className="select-container">
            <select className="form-select" aria-label="Default select example">
              <option selected>06:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
            <h4 className="h4"> - </h4>
            <select className="form-select" aria-label="Default select example">
              <option selected>20:00</option>
              <option value="6">06:00</option>
              <option value="7">07:00</option>
              <option value="8">08:00</option>
              <option value="9">09:00</option>
              <option value="10">10:00</option>
              <option value="11">11:00</option>
              <option value="12">12:00</option>
              <option value="13">13:00</option>
              <option value="14">14:00</option>
              <option value="15">15:00</option>
              <option value="16">16:00</option>
              <option value="17">17:00</option>
              <option value="18">18:00</option>
              <option value="19">19:00</option>
              <option value="20">20:00</option>
              <option value="21">21:00</option>
              <option value="22">22:00</option>
              <option value="23">23:00</option>
            </select>
          </div>

          <Button variant="primary" type="submit" className="w-50 mb-3">
            dodaj
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddEmployee;
