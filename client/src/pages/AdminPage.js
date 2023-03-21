import Navbar from '../comps/Navbar'
import CustomerList from '../comps/CustomerList'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {

  const [ customers, setCustomers ] = useState(null)
  const admin = sessionStorage.getItem('admin')
  const navigate = useNavigate()

  function getCustomers() {
    axios.get(`http://localhost:5000/customer/`).then(response => {
      setCustomers(response.data)
    })
  }

  useEffect(() => {
    if (admin != null) {getCustomers()}
  }, [])

  if (admin === "false") {
    navigate('/login')
  }

  if (customers === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  } else {
    return (
      <div>
        <Navbar />
        <div className='title'>Admin</div>
        <CustomerList customers={customers}/>
      </div>
    )
  }
}
