import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./styles.css"

const Header = () => {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="header">
      <p className="logo"> System</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={activeTab === "adduser" ? "active" : ""}
            onClick={() => setActiveTab("adduser")}
          >
            Add User
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Header
