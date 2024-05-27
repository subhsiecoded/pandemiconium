import React, { useState } from "react";
import { toast } from "react-toastify";
import "../css/Inventory.css";

function InventoryItem({ item, removeItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateItem(item.id, editedItem);
    setIsEditing(false);
    toast.success("Item updated successfully.");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedItem({ ...item });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleRemoveClick = () => {
    removeItem(item.id); 
    toast.success("Item removed successfully.");
  };

  return (
    <div className="inventory-item">
      {isEditing ? (
        <div>
          <h3>{item.name}</h3>
          <input
            type="number"
            name="quantity"
            value={editedItem.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
          />
          <input
            type="number"
            name="threshold"
            value={editedItem.threshold}
            onChange={handleInputChange}
            placeholder="Threshold"
          />
          <select
            name="unit"
            value={editedItem.unit}
            onChange={handleInputChange}
          >
            <option value="kilograms">Kilograms</option>
            <option value="litres">Litres</option>
            <option value="grams">Grams</option>
            <option value="tabs">Tabs</option>
          </select>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{item.name}</h3>
          <p>
            Quantity: {item.quantity} {item.unit}
          </p>
          <p>
            Threshold: {item.threshold} {item.unit}
          </p>
        </div>
      )}
    </div>
  );
}

export default InventoryItem;
