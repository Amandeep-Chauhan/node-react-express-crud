import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

import "./styles.css"

const AddEdit = () => {
  const formData = {
    name: "",
    email: "",
    contact: "",
  }
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState(formData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const addUser = async (data) => {
    const res = await axios.post("http://localhost:5000/user", data)
    if (res.status === 200) {
      toast.success("User added successfully")
      navigate("/")
    }
  }

  const updateUser = async (data) => {
    const res = await axios.put(`http://localhost:5000/user/${id}`, data)
    if (res.status === 200) {
      toast.success("User updated successfully")
      navigate("/")
    }
  }

  console.log("id: ", id)
  const getUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`)

    if (res.status === 200) {
      setForm(res.data[0])
    }
  }

  useEffect(() => {
    if (id) {
      getUser(id)
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.contact) {
      return toast.error("Please fill all the fields")
    }

    if (id) {
      updateUser(form)
    } else {
      addUser(form)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          className="form-control"
          id="contact"
          name="contact"
          placeholder="Enter contact"
          value={form.contact}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {id ? "Update" : "Submit"}
      </button>
    </form>
  )
}

export default AddEdit
