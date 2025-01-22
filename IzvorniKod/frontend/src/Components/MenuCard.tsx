import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "../styles/MenuCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

interface MenuItem {
  idJela: number;
  kategorija: string;
  nazivJela: string;
  cijena: number;
}

interface MenuCardProps {
  menzaId: string;
  role: number;
}

function MenuCard({ menzaId, role }: MenuCardProps) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${apiUrl}/menza/${menzaId}/jelovnik`);
        setMenu(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenu();
  }, [menzaId]);

  const handleEditToggle = () => {
    if (isEditMode) handleSave();
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${apiUrl}/menza/${menzaId}/jelovnik`, menu);
      console.log("Menu saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving menu data:", error);
    }
  };

  const handleAddItem = (kategorija: string) => {
    const newItem: MenuItem = {
      idJela: Date.now(),
      kategorija: kategorija,
      nazivJela: "Novi artikl",
      cijena: 1,
    };
    setMenu([...menu, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    const updatedMenu = menu.filter((item) => item.idJela !== id);
    setMenu(updatedMenu);
  };

  interface HandleInputChangeParams {
    id: number;
    field: keyof MenuItem;
    value: string | number;
  }

  const handleInputChange = ({ id, field, value }: HandleInputChangeParams) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.idJela === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <>
      <Card className="menu-card">
        <Card.Body>
          <Card.Header className="header">
            <div className="title-container">
              <Card.Title>Jelovnik</Card.Title>
              {role === 2 && (
                <div className="button-container">
                  <Button onClick={handleEditToggle}>
                    {isEditMode ? (
                      "Save"
                    ) : (
                      <FontAwesomeIcon icon={faPaintBrush} />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card.Header>
          {["Doručak", "Ručak", "Večera"].map((kategorija) => (
            <div key={kategorija}>
              <h5>
                {kategorija.charAt(0).toUpperCase() + kategorija.slice(1)}
              </h5>
              <ListGroup variant="flush">
                {menu.filter((item) => item.kategorija === kategorija).length >
                0 ? (
                  menu
                    .filter((item) => item.kategorija === kategorija)
                    .map((item) => (
                      <ListGroup.Item
                        key={item.idJela}
                        className="list-group-item"
                      >
                        {isEditMode ? (
                          <>
                            <input
                              type="text"
                              value={item.nazivJela}
                              onChange={(e) =>
                                handleInputChange({
                                  id: item.idJela,
                                  field: "nazivJela",
                                  value: e.target.value,
                                })
                              }
                            />
                            <input
                              type="number"
                              value={item.cijena}
                              onChange={(e) =>
                                handleInputChange({
                                  id: item.idJela,
                                  field: "cijena",
                                  value: parseFloat(e.target.value),
                                })
                              }
                            />
                            <Button
                              variant="danger"
                              className="remove-item-button"
                              onClick={() => handleRemoveItem(item.idJela)}
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          <>
                            <span>{item.nazivJela}</span>: {item.cijena}€
                          </>
                        )}
                      </ListGroup.Item>
                    ))
                ) : (
                  <p>No items available</p>
                )}
                {isEditMode && (
                  <Button
                    variant="primary"
                    className="add-item-button"
                    onClick={() => handleAddItem(kategorija)}
                  >
                    Add
                  </Button>
                )}
              </ListGroup>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}

export default MenuCard;
