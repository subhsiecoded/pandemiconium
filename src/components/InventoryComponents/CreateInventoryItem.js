
import React, { useState } from "react";
import { toast } from "react-toastify";
import "../css/Inventory.css";

function CreateInventoryItem({ addItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const [unit, setUnit] = useState("kilograms");

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantityValue = parseFloat(quantity);
    const thresholdValue = parseFloat(threshold);

    if (thresholdValue > quantityValue) {
      toast.error("Threshold cannot be greater than quantity.");
      return;
    }

    addItem({ name, quantity: quantityValue, threshold: thresholdValue, unit });

    setName("");
    setQuantity("");
    setThreshold("");
    setUnit("kilograms");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          placeholder="Threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="form-select"
          required
        >
          <option value="kilograms">Kilograms</option>
          <option value="litres">Litres</option>
          <option value="grams">Grams</option>
          <option value="tabs">Tabs</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Item
      </button>
    </form>
  );
}

export default CreateInventoryItem;