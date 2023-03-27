import Navbar from '../comps/Navbar'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Bank from '../objects/Bank'

export default function AdminPage() {

  const [ customers, setCustomers ] = useState(null)
  const admin = sessionStorage.getItem('admin')
  const navigate = useNavigate();
  const reserve = new Bank();

  function getCustomers() {
    reserve.getCustomers().then((data) => {
      setCustomers(data)
    })
  }

  useEffect(() => {
    if (admin !== "false") {getCustomers()}
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
        <div>{customers.map((customer) => {
          if (customer.username !== 'admin') {
            return(
              <>
                <div>
                  {customer._id}
                  {customer.first}
                  {customer.last}
                  {customer.username}
                  {customer.email}
                  {customer.address}
                </div>
              </>
            )
          }
        })}
        </div>
      </div>
    )
  }
}
