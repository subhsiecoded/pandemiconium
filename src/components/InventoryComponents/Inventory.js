import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InventoryItem from "./InventoryItem";
import SearchBox from "./SearchBox";
import CreateInventoryItem from "./CreateInventoryItem";
import CurrentDateTime from "../CurrentDateTime";
import NoInventoryLists from "../headers/NoInventoryLists";
import { v4 as uuid } from "uuid";
import "../css/Inventory.css";
import logo from "../img/logonav.png";
import logoWatermark from "../img/invlist.png";
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
  width: 500px; /* Adjusted width */
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

const InventoryItemContainer = styled.div`
  background-color: rgba(44, 36, 36, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: inset -6px -4px 2px rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1.5px solid rgba(0, 0, 0, 0.326);
  color: ${(props) => (props.darkMode ? "white" : "#413e3e")};
  padding: 15px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  word-wrap: break-word;
`;

const StyledNav = styled.nav`
  background-color: #343a40; /* Dark background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  padding: 0.5rem 1rem; /* Add some padding */

  .navbar-brand {
    color: #fff; /* Set the logo text color to white */
  }

  .nav-link {
    color: #ccc; /* Set the default link color to light gray */
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem; /* Add some padding to the links */
    border-radius: 0.25rem; /* Add rounded corners */

    &:hover {
      background-color: #fff; /* Change the background color to white on hover */
      color: #343a40; /* Change the text color to dark on hover */
    }

    &.active {
      background-color: #007bff; /* Change the background color for the active link */
      color: #fff; /* Change the text color for the active link */
    }
  }

  .navbar-toggler {
    border-color: #ccc; /* Change the border color of the toggler */
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Change the toggler icon to a custom SVG */
  }
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

function Inventory({ darkMode }) {
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [expandedLists, setExpandedLists] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [oldQuantity, setOldQuantity] = useState(null);

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
        name: lists
          .find((list) => list.id === listId)
          .items.find((item) => item.id === itemId).name,
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
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                }
              : list
          )
        );
        displayPopupMessage("Item removed successfully.");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleListTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const createList = () => {
    if (!listTitle) {
      displayPopupMessage(
        "Title must be there before saving the inventory list"
      );
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = lists
      .filter(
        (list) =>
          list.title.toLowerCase().includes(query.toLowerCase()) ||
          list.items.some((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
      )
      .map((list) => ({
        title: list.title,
        items: list.items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ),
      }));

    setSearchResults(results);
  };

  const toggleExpandCollapse = (listId) => {
    setExpandedLists((prevExpandedLists) => ({
      ...prevExpandedLists,
      [listId]: !prevExpandedLists[listId],
    }));
  };

  const handleEditItem = (listId, itemId) => {
    setEditingItemId(itemId);
    const item = lists
      .find((list) => list.id === listId)
      .items.find((item) => item.id === itemId);
    setOldQuantity(item.quantity);
  };

  const handleUpdateItem = (
    listId,
    itemId,
    newName,
    newQuantity,
    newThreshold,
    newUnit
  ) => {
    const token = JSON.parse(localStorage.getItem("userId"))?.token;
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const requestBody = {
      id: token,
      list_name: lists.find((list) => list.id === listId).title,
      old_name: lists
        .find((list) => list.id === listId)
        .items.find((item) => item.id === itemId).name,
      new_name: newName,
      quantity: newQuantity,
      threshold: newThreshold,
      unit: newUnit,
      old_quantity: oldQuantity,
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
        setEditingItemId(null);
        setOldQuantity(null);
        displayPopupMessage("Item updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating item:", error.message);
        displayPopupMessage("Error updating item. Please try again later.");
      });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setOldQuantity(null);
  };

  return (
    <>
      <StyledNav
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
                <Link className="nav-link" to="/pandemic">
                  Pandemic info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map Portal
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
      </StyledNav>
      <Container darkMode={darkMode}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results</h3>
            {searchResults.map((list, index) => (
              <div key={index}>
                <h4>{list.title}</h4>
                <ul>
                  {list.items.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {searchQuery.trim() !== "" && searchResults.length === 0 && (
          <p>No matching items or lists found</p>
        )}
        <div
          className="inventory"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {Array.isArray(lists) && lists.length > 0 ? (
            lists.map((list) => (
              <FormContainer key={list.id} darkMode={darkMode}>
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
                  <h2>{list.title}</h2>
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    maxHeight: expandedLists[list.id] ? "1000px" : "0",
                  }}
                >
                  {list.items.map((item) => (
                    <InventoryItemContainer
                      key={item.id}
                      className="inventory-item"
                      darkMode={darkMode}
                    >
                      {editingItemId === item.id ? (
                        <InventoryItem
                          item={item}
                          onUpdate={handleUpdateItem}
                          onCancel={handleCancelEdit}
                          listId={list.id}
                        />
                      ) : (
                        <>
                          <div>
                            <h3>{item.name}</h3>
                            <p>
                              Quantity: {item.quantity} {item.unit}
                            </p>
                            <p>
                              Threshold: {item.threshold} {item.unit}
                            </p>
                          </div>
                          <EditButton
                            onClick={() => handleEditItem(list.id, item.id)}
                          >
                            Edit
                          </EditButton>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => removeItemFromList(list.id, item.id)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </InventoryItemContainer>
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
          <FormContainer darkMode={darkMode}>
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
