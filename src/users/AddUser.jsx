import React, { useState } from 'react';
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
  const [user, setUser] = useState({
    name: "",
    use: "",
    cost: "",
    quantity: "",
  });

  const { name, use, cost, quantity } = user;
  let navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", user);
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the item!", error);
    }
  };

  return (
    <div className='container mt-4'>
      <div className='card shadow-sm'>
        <div className='card-body'>
          <h5 className='card-title mb-4'>Add New Item</h5>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item's Name</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                name="name"
                placeholder="Apple"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemUsage" className="form-label">Dish / Use</label>
              <input
                type="text"
                className="form-control"
                id="itemUsage"
                name="use"
                placeholder="Salad"
                value={use}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemQuantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="itemQuantity"
                name="quantity"
                placeholder="2"
                value={quantity}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="itemCost" className="form-label">Cost</label>
              <input
                type="number"
                className="form-control"
                id="itemCost"
                name="cost"
                placeholder="100"
                value={cost}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='d-flex justify-content-between'>
              <button type="submit" className="btn btn-success">Submit</button>
              <Link to="/" className="btn btn-danger">Delete</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
