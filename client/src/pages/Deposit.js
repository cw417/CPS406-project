import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar'
import CustomerAccounts from '../comps/CustomerAccounts';
import Customer from '../interfaces/Customer';
import axios from 'axios'

export default function Deposit() {
  const [ customer, setCustomer ] = useState(null)
  const userId = localStorage.getItem('userId')

  function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      setCustomer(new Customer(response.data.name, response.data.address, response.data.email, response.data.password, response.data.accounts.chequing, response.data.accounts.savings, response.data.transactionHistory, response.data._id))
    })
  }
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {getCustomer()} else {navigate('/login')}
  }, [])

  const [accountType, setAccountType] = useState('Chequing');
  const depositRef = useRef();

  function deposit() {
    const amount = parseInt(depositRef.current.value);
    customer.deposit(amount, accountType)
    navigate('/customerPage');
  }

  function handleChangeAccountType(event) {
    setAccountType(event.target.value);
  }

  if (customer === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  } else {
    return (
      <div>
        <Navbar />
        <div className='title'>Deposit</div>
        <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />
        <div>
          <input ref={depositRef} type='text' placeholder={"Amount"} />
            <input type='radio' id='chequing' name='accountType' value='Chequing' onChange={handleChangeAccountType} />
            <label>Chequing</label>
            <input type='radio' id='savings' name='accountType' value='Savings' onChange={handleChangeAccountType} />
            <label>Savings</label>
            <button type='submit' onClick={deposit}>Deposit</button>
        </div>
  
      </div>
    )
  }
}
