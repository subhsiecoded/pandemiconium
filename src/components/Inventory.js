import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InventoryItem from "./InventoryItem";
import CreateInventoryItem from "./CreateInventoryItem";
import CurrentDateTime from "./CurrentDateTime";
import NoInventoryLists from './headers/NoInventoryLists';
import { v4 as uuid } from "uuid";
import "./css/Inventory.css";
import logo from "./img/logonav.png";
import logoWatermark from "./img/invlist.png";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  color: ${(props) => (props.darkMode ? "white" : "black")};
  background-image: url(${logoWatermark}); /* Static image */
  background-repeat: repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
  animation: animateBackground 15s linear infinite;

  @keyframes animateBackground {
    from {
      background-position: 0 0; /* Starting position */
    }
    to {
      background-position: 100% 100%; /* Ending position */
    }
  }
`;

const FormContainer = styled.div`
  width: 400px; /* Adjusted width */
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.darkMode ? "#333" : "#ffffff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#222")};
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  margin-bottom: 5px;
  padding: 5px;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  align-self: center;
  margin-top: 10px;
`;

const ExpandCollapseButton = styled.span`
  cursor: pointer;
  margin-right: 10px;
  font-size: 20px;
  transition: transform 0.3s ease;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
`;

const displayPopupMessage = (message) => {
  toast.info(message, {
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};

const generateUniqueTitle = (lists, baseTitle) => {
  let uniqueTitle = baseTitle;
  let counter = 1;

  while (lists.some((list) => list.title === uniqueTitle)) {
    uniqueTitle = `${baseTitle} (${counter})`;
    counter++;
  }

  return uniqueTitle;
};

function Inventory({darkMode}) {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [editedTitleId, setEditedTitleId] = useState(null);
  const [expandedLists, setExpandedLists] = useState({});

  useEffect(() => {
    // Fetch inventory lists when component mounts
    fetchInventoryLists();
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchInventoryLists = () => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
      console.error("Token not found.");
      return;
    }
    fetch(
      `https://pandemiconiummanager.azurewebsites.net/GetInventoryList/${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Group items by their list title
          const groupedItems = data.reduce((acc, item) => {
            const listTitle = item.list_name || "Untitled List";
            if (!acc[listTitle]) {
              acc[listTitle] = [];
            }
            acc[listTitle].push({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              threshold: item.threshold,
              unit: item.unit,
            });
            return acc;
          }, {});

          // Convert the grouped items into list objects
          const formattedLists = Object.entries(groupedItems).map(
            ([title, items]) => ({
              id: uuid(),
              title: title,
              items: items,
            })
          );

          setLists(formattedLists);
        } else {
          console.log("Empty backend for the user");
        }
      })
      .catch((error) => {
        console.error("Error fetching inventory lists:", error);
      });
  };

  const addItemToList = (listTitle, item) => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const existingList = lists.find((list) => list.title === listTitle);

    if (existingList) {
      // List with the given title already exists, add the item to that list
      if (existingList.items.length >= 5) {
        displayPopupMessage("Cannot add more than 5 items.");
        return;
      }
      if (item.quantity < 0) {
        displayPopupMessage("The quantity cannot be less than 0.");
        return;
      }

      const requestBody = {
        id: token,
        list_name: listTitle,
        name: item.name,
        quantity: item.quantity,
        threshold: item.threshold,
        unit: item.unit,
      };

      fetch("https://pandemiconiummanager.azurewebsites.net/AddItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          console.log("Item added successfully:", data);
          setLists((prevLists) =>
            prevLists.map((list) =>
              list.title === listTitle
                ? { ...list, items: [...list.items, { ...item, id: uuid() }] }
                : list
            )
          );
          displayPopupMessage("Item added successfully.");
        })
        .catch((error) => {
          console.error("Error adding item:", error.message);
          displayPopupMessage("Error adding item. Please try again later.");
        });
    } else {
      // List with the given title doesn't exist, create a new list
      const uniqueTitle = generateUniqueTitle(lists, listTitle);
      const newList = {
        id: uuid(),
        title: uniqueTitle,
        items: [{ ...item, id: uuid() }],
      };

      const updatedLists = [...lists, newList];
      setLists(updatedLists);
      displayPopupMessage("New list created successfully.");
    }
  };

  const removeItemFromList = (listId, itemId) => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
        console.error("Token not found.");
        return;
    }

    fetch("https://pandemiconiummanager.azurewebsites.net/DeleteItem", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: token,
            list_name: lists.find((list) => list.id === listId).title,
            name: lists.find((list) => list.id === listId).items.find((item) => item.id === itemId).name,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Item deleted successfully:", data);
        // Update the state to remove the deleted item
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? {
                    ...list,
                    items: list.items.filter((item) => item.id !== itemId),
                } : list
            )
        );
        displayPopupMessage("Item removed successfully.");
    })
    .catch((error) => {
        console.error("Error deleting item:", error);
    });
};

  const createList = () => {
    if (!listTitle) {
      displayPopupMessage("Title must be there before saving the inventory list");
      return;
    }

    const uniqueTitle = generateUniqueTitle(lists, listTitle);
    const newList = {
      id: uuid(),
      title: uniqueTitle,
      items: [],
    };

    const updatedLists = Array.isArray(lists) ? [...lists, newList] : [newList];
    setLists(updatedLists);
    setListTitle("");
    console.log("New List ID:", newList.id);
    displayPopupMessage("New list created successfully.");
  };

  const deleteList = (listId) => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
      console.error("Token not found.");
      return;
    }
    const deletedList = lists.find((list) => list.id === listId);
    const requestBody = {
      id: token,
      list_name: deletedList.title,
    };
    fetch("https://pandemiconiummanager.azurewebsites.net/DeleteList", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log("List deleted successfully:", data))
      .catch((error) => console.error("Error deleting list:", error));

    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    console.log("Deleted List ID:", deletedList.id);
    displayPopupMessage("List deleted successfully.");
  };

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  const handleEditTitle = (listId) => {
    setEditedTitleId(listId);
  };

  const handleTitleEdit = (listId, newTitle) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return { ...list, title: newTitle };
        }
        return list;
      })
    );
    setEditedTitleId(null);
    displayPopupMessage("List title updated successfully.");
  };

  const toggleExpandCollapse = (listId) => {
    setExpandedLists((prevExpandedLists) => ({
      ...prevExpandedLists,
      [listId]: !prevExpandedLists[listId],
    }));
  };

  const handleEditItem = (listId, itemId, newName, newQuantity, newThreshold, newUnit) => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const requestBody = {
      id: token,
      list_name: lists.find((list) => list.id === listId).title,
      old_name: lists.find((list) => list.id === listId).items.find((item) => item.id === itemId).name,
      new_name: newName,
      quantity: newQuantity,
      threshold: newThreshold,
      unit: newUnit,
    };

    fetch("https://pandemiconiummanager.azurewebsites.net/UpdateItem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item updated successfully:", data);
        // Update the item in the state
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? {
                          ...item,
                          name: newName,
                          quantity: newQuantity,
                          threshold: newThreshold,
                          unit: newUnit,
                        }
                      : item
                  ),
                }
              : list
          )
        );
        displayPopupMessage("Item updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating item:", error.message);
        displayPopupMessage("Error updating item. Please try again later.");
      });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            alt="Logo"
            className="navbar-brand mx-auto"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notes">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/remind">
                  Reminder
                </Link>
              </li>
            </ul>
          </div>
          <CurrentDateTime />
        </div>
      </nav>
      <Container>
        <div
          className="inventory"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {Array.isArray(lists) && lists.length > 0 ? (
            lists.map((list) => (
              <FormContainer key={list.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ExpandCollapseButton
                    onClick={() => toggleExpandCollapse(list.id)}
                    style={{
                      transform: expandedLists[list.id]
                        ? "rotate(45deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    +
                  </ExpandCollapseButton>
                  {editedTitleId === list.id ? (
                    <StyledInput
                      type="text"
                      value={list.title}
                      onChange={(e) =>
                        handleTitleEdit(list.id, e.target.value)
                      }
                      onBlur={() => handleTitleEdit(list.id, list.title)}
                    />
                  ) : (
                    <h2 onClick={() => handleEditTitle(list.id)}>
                      {list.title}
                    </h2>
                  )}
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    maxHeight: expandedLists[list.id] ? "1000px" : "0",
                  }}
                >
                  {list.items.map((item) => (
                    <div key={item.id} className="inventory-item">
                      <div>
                        <h3>{item.name}</h3>
                        <p>
                          Quantity: {item.quantity} {item.unit}{" "}
                        </p>
                        <p>
                          Threshold: {item.threshold} {item.unit}{" "}
                        </p>
                      </div>
                      <EditButton>Edit</EditButton>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => removeItemFromList(list.id, item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <CreateInventoryItem
                    addItem={(item) => addItemToList(list.title, item)}
                  />
                  <StyledButton
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteList(list.id)}
                  >
                    Delete List
                  </StyledButton>
                </div>
              </FormContainer>
            ))
          ) : (
            <NoInventoryLists darkMode={darkMode} />
          )}
          <FormContainer>
            <StyledInput
              type="text"
              placeholder="Enter List Title"
              value={listTitle}
              onChange={handleListTitleChange}
              required
            />
            <StyledButton
              type="button"
              className="btn btn-primary"
              onClick={createList}
            >
              Add List
            </StyledButton>
          </FormContainer>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Inventory;
