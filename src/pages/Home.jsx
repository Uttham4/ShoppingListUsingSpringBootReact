import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ShopList() {

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    loadUsers();
  }, []);

  
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/user");
    setUsers(result.data);
    totalCalculator(result.data);
  }
  
  const totalCalculator=async(data)=>{
    let totalCost=0;
    data.forEach(user => {
      totalCost+=user.cost;
    });
    setTotal(totalCost);
  }
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  }
  

  return (
    <div className="container mt-4">
      <div className="shadow">
        <table className="table table-hover mx-auto">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Item</th>
              <th scope="col">Dish / Use</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.use}</td>
                <td>{user.quantity}</td>
                <td>{user.cost}</td>
                <td>
                  <Link className="btn btn-outline-primary mx-2" to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-warning mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-outline-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6"><h5>Total Cost : Rs.{total}</h5></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
