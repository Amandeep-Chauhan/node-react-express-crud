import { useEffect, useState } from "react"
import axios from "axios"
import "./styles.css"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Home = () => {
  const [data, setData] = useState([])
  console.log("data: ", data)

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/users")

    if (res.status === 200) {
      setData(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await axios.delete(`http://localhost:5000/user/${id}`)

      if (res.status === 200) {
        toast.success("User deleted successfully")
        fetchData()
      }
    }
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td className="actions">
                <Link to={`/edit/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.id}`}>
                  <button className="btn btn-view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
