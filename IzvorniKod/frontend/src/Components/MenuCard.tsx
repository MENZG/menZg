import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import "../styles/MenuCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

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
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenu();
  }, [menzaId]);

  const handleEditClick = (itemId: number) => {
    if (editMode[itemId]) {
      const itemToUpdate = menu.find((item) => item.idJela === itemId);
      if (itemToUpdate) {
        saveItem(itemToUpdate);
      }
    }
    setEditMode((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const saveItem = async (item: MenuItem) => {
    try {
      await axios.put(
        `${apiUrl}/menza/${menzaId}/jelovnik/${item.idJela}/${item.kategorija}/${item.nazivJela}/${item.cijena}`
        //item
      );
      console.log("uspjeh");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleRemoveClick = (itemId: number) => {
    removeItem(itemId);

    setMenu((prevMenu) => prevMenu.filter((item) => item.idJela !== itemId));
  };

  const removeItem = async (itemId: number) => {
    try {
      await axios.delete(`${apiUrl}/menza/${itemId}`);
    } catch (error) {
      console.error("Error removing menu item:", error);
    }
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
    saveNewItem(newItemToAdd);
  };

  const saveNewItem = async (item: MenuItem) => {
    try {
      await axios.post(`${apiUrl}/menza/${menzaId}/novoJelo`, item);
    } catch (error) {
      console.error("Error saving new menu item:", error);
    }
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
                              className="input-custom input"
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
                              className="input-custom input"
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
                            <div
                              className="float-right"
                              style={{ display: "flex", gap: "10px" }}
                            >
                              <Button
                                className={`button-custom ${
                                  editMode[item.idJela]
                                    ? "button-custom-primary save-btn"
                                    : "button-custom-primary edit-btn"
                                }`}
                                onClick={() => handleEditClick(item.idJela)}
                              >
                                {editMode[item.idJela] ? (
                                  <IoCheckmarkDoneSharp />
                                ) : (
                                  <FontAwesomeIcon icon={faPaintBrush} />
                                )}
                              </Button>
                              <Button
                                className="button-custom button-custom-danger remove-btn"
                                onClick={() => handleRemoveClick(item.idJela)}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <MdOutlineRemoveCircleOutline size={20} />
                                </div>
                              </Button>
                            </div>
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
                          className="input-custom input"
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
                          className="input-custom input"
                          onChange={(e) =>
                            handleNewItemChange(
                              kategorija,
                              "cijena",
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant="primary"
                          onClick={() => handleAddNewItem(kategorija)}
                          className="add-btn"
                        >
                          Add
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline-success"
                        onClick={() => toggleNewItemInputs(kategorija)}
                        className="add-new-btn"
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
