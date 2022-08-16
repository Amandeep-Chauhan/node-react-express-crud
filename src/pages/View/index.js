import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import "./styles.css"

const View = () => {
  const [data, setData] = useState({})

  const { id } = useParams()

  const getuser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`)

    if (res.status === 200) {
      setData(res.data[0])
    } else {
      toast.error("User not found")
    }
  }

  useEffect(() => {
    if (id) {
      getuser(id)
    }
  }, [id])

  return (
    <div className="view">
      <div className="view-group">
        <h3>Name: </h3>
        <span>{data.name}</span>
      </div>
      <div className="view-group">
        <h3>Email: </h3>
        <span>{data.email}</span>
      </div>
      <div className="view-group">
        <h3>Contact: </h3>
        <span>{data.contact}</span>
      </div>
    </div>
  )
}

export default View
