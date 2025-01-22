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
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [newItem, setNewItem] = useState<{
    [key: string]: { nazivJela: string; cijena: number };
  }>({});
  const [showNewItemInputs, setShowNewItemInputs] = useState<{
    [key: string]: boolean;
  }>({});

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

  const handleEditClick = (itemId: number) => {
    setEditMode((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleRemoveClick = (itemId: number) => {
    setMenu((prevMenu) => prevMenu.filter((item) => item.idJela !== itemId));
  };

  const handleInputChange = (
    itemId: number,
    field: string,
    value: string | number
  ) => {
    setMenu((prevMenu) =>
      prevMenu.map((item) =>
        item.idJela === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleNewItemChange = (
    category: string,
    field: string,
    value: string | number
  ) => {
    setNewItem((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleAddNewItem = (category: string) => {
    const newItemData = newItem[category];
    if (!newItemData?.nazivJela || newItemData.cijena <= 0) {
      alert("Name must not be empty and cost must be greater than 0");
      return;
    }
    const newItemId = menu.length
      ? Math.max(...menu.map((item) => item.idJela)) + 1
      : 1;
    const newItemToAdd = {
      idJela: newItemId,
      kategorija: category,
      nazivJela: newItemData.nazivJela,
      cijena: newItemData.cijena,
    };
    setMenu((prevMenu) => [...prevMenu, newItemToAdd]);
    setNewItem((prev) => ({
      ...prev,
      [category]: { nazivJela: "", cijena: 0 },
    }));
    setShowNewItemInputs((prev) => ({ ...prev, [category]: false }));
  };

  const toggleNewItemInputs = (category: string) => {
    setShowNewItemInputs((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <>
      <Card className="menu-card">
        <Card.Body>
          <Card.Header className="header">
            <div className="title-container">
              <Card.Title>Jelovnik</Card.Title>
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
                        {editMode[item.idJela] ? (
                          <>
                            <input
                              type="text"
                              value={item.nazivJela}
                              onChange={(e) =>
                                handleInputChange(
                                  item.idJela,
                                  "nazivJela",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="number"
                              value={item.cijena}
                              onChange={(e) =>
                                handleInputChange(
                                  item.idJela,
                                  "cijena",
                                  e.target.value
                                )
                              }
                            />
                          </>
                        ) : (
                          <>
                            {item.nazivJela} - {item.cijena} €
                          </>
                        )}
                        {role === 2 && (
                          <>
                            <Button
                              variant="primary"
                              onClick={() => handleEditClick(item.idJela)}
                            >
                              {editMode[item.idJela] ? (
                                "Save"
                              ) : (
                                <FontAwesomeIcon icon={faPaintBrush} />
                              )}
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveClick(item.idJela)}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </ListGroup.Item>
                    ))
                ) : (
                  <p>No items available</p>
                )}
                {role === 2 && (
                  <ListGroup.Item className="list-group-item">
                    {showNewItemInputs[kategorija] ? (
                      <>
                        <input
                          type="text"
                          placeholder="Naziv jela"
                          value={newItem[kategorija]?.nazivJela || ""}
                          onChange={(e) =>
                            handleNewItemChange(
                              kategorija,
                              "nazivJela",
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="number"
                          placeholder="Cijena"
                          value={newItem[kategorija]?.cijena || ""}
                          onChange={(e) =>
                            handleNewItemChange(
                              kategorija,
                              "cijena",
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant="success"
                          onClick={() => handleAddNewItem(kategorija)}
                        >
                          Add
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => toggleNewItemInputs(kategorija)}
                      >
                        Add New Item
                      </Button>
                    )}
                  </ListGroup.Item>
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
