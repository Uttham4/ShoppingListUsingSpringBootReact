import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid shadow">
                <Link className="navbar-brand" to="/">ShopList</Link>
                <Link to="/user" className='btn btn-outline-primary w-auto h-auto'>Add Item</Link>
            </div>
        </nav>
  )
}
