import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import NavBarAdmin from "./NavBarAdmin";
import { Button, Form } from "react-bootstrap";
import "/src/styles/AddMenza.css";
import axios from "axios";

// Definicija tipa za Product
interface Product {
  name: string;
  ulica: string;
  broj: string;
  startTime: string;
  endTime: string;
}

const AddMenza: React.FC = () => {
  // State za proizvod i sliku
  const [product, setProduct] = useState<Product>({
    name: "",
    ulica: "",
    broj: "",
    startTime: "",
    endTime: "",
  });
  //const [image, setImage] = useState<File | null>(null);
  const [menze, setMenze] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/menze")
      .then((response) => {
        console.log("Dohvaćene menze:", response.data);
        setMenze(response.data); // Postavljanje menzi u state
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja menzi:", error);
      });
  }, []);

  // Handler za promjenu input polja
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handler za submit forme
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("/api/menze", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <>
      <NavBarAdmin />
      <div className="dodaj-menzu-container">
        <h2 className="h2">unesite podatke o novoj menzi</h2>
        <Form
          className="w-100"
          style={{ maxWidth: "400px" }}
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="puni naziv menze"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="ulica"
              onChange={handleInputChange}
              value={product.ulica} // Promjena: "ulica" umjesto "name"
              name="ulica"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              className="form-control"
              type="text"
              placeholder="kućni broj"
              onChange={handleInputChange}
              value={product.broj} // Promjena: "broj" umjesto "name"
              name="broj"
            />
          </Form.Group>

          <h4 className="h4">radno vrijeme radnim danom</h4>
          <div className="select-container">
            <select
              className="form-select"
              aria-label="Default select example"
              value={product.startTime}
              onChange={handleInputChange}
              name="startTime"
            >
              <option value="">06:00</option>
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
            <select
              className="form-select"
              aria-label="Default select example"
              value={product.endTime}
              onChange={handleInputChange}
              name="endTime"
            >
              <option value="">20:00</option>
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
        <h2>Popis Menzi</h2>
        <ul>
          {menze.map((menza, index) => (
            <li key={index}>
              {menza.name} - {menza.ulica} {menza.broj}, {menza.startTime} -{" "}
              {menza.endTime}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddMenza;
