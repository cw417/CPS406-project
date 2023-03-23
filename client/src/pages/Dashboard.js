import { useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {

  const [customer, setCustomer] = useState(null)
  const userId = localStorage.getItem('userId')

  async function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      setCustomer(response.data)
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {getCustomer()} else {navigate('/login')}
  }, [])

  if (customer === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  }
  
  return (
    <div>
      <Navbar />

    </div>
  )
}
