import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

  const {id}=useParams();
  const [user, setUser] = useState(
    {
      name:"",
      use:"",
      cost:"",
      quantity:"",
    }
  );
  useEffect(() => {
    loadUser();
  }, [])
  const loadUser=async()=>{
    const result=await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data)
  }
  
  return (
    <div>
      <div class="card">
        <h4 class="card-header">{user.name}</h4>
        <div class="card-body">
          <h5 class="card-title">Dish / Use : {user.use}</h5>
          <p class="card-text">Quantitty : {user.quantity}</p>
          <p class="card-text">Cost : {user.cost}</p>
          <Link to={`/edituser/${user.id}`} class="btn btn-outline-warning">Edit</Link>
      </div>
</div>
    </div>
  )
}
