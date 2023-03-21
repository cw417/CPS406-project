import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar';
import CustomerAccounts from '../comps/CustomerAccounts';
import Customer from '../interfaces/Customer';
import axios from 'axios'

export default function Transfer() {

  const [ customer, setCustomer ] = useState(null)
  const userId = localStorage.getItem('userId')

  function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      setCustomer(new Customer(response.data.username, response.data.first, response.data.last, response.data.address, response.data.email, response.data.password, response.data.accounts.chequing, response.data.accounts.savings, response.data.transactionHistory, response.data._id))
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {getCustomer()} else {navigate('/login')}
  }, [])

  const [accountType, setAccountType] = useState('Chequing');
  const amountRef = useRef();
  const toRef = useRef();
  const fromRef = useRef();
  
  function transfer() {
    console.log("transfer")
    const amount = parseInt(amountRef.current.value);
    customer.transfer(amount, accountType, toRef.current.value, fromRef.current.value);
    navigate('/accounts');
  }

  function handleChange(event) {
    setAccountType(event.target.value);
  }

  if (customer === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>
    )
  } else {
    return (
      <div>
        <Navbar />
        <div className='title'>Transfer</div>
        <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />
        <div>
          <input type='radio' id='chequing' name='accountType' value='Chequing' onChange={handleChange} />
          <label>Chequing</label>
          <input type='radio' id='savings' name='accountType' value='Savings' onChange={handleChange} />
          <label>Savings</label>
          <input type='text' ref={toRef} placeholder='To' />
          <input type='text' ref={fromRef} placeholder='From' />
          <input ref={amountRef} type='text' placeholder='Amount' />
          <button type='submit' onClick={transfer}>Transfer</button>
        </div>
  
      </div>
    )
  }
}
