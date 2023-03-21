import CustomerAccounts from '../comps/CustomerAccounts'
import Navbar from '../comps/Navbar'
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Customer from '../interfaces/Customer';
import Transaction from '../interfaces/Transaction';
import axios from 'axios'

export default function PayBills() {

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

  const toRef = useRef();
  const amountRef = useRef();
  const [accountType, setAccountType] = useState('Chequing');

  function handlePayBills() {
    const amount = parseInt(amountRef.current.value);
    accountType === 'Chequing' ? customer.accounts.chequing -= amount : customer.accounts.savings -= amount;
    if (customer.accounts.chequing < 0 || customer.accounts.savings < 0) { return null }
    const newTransaction = new Transaction(amount, accountType, toRef.current.value, customer.name);
    customer.transactionHistory.push(newTransaction);
    customer.updateCustomer();
    navigate('/accounts');
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
        <div className='title'>Pay Bills</div>
        <CustomerAccounts  chequing={customer.accounts.chequing} savings={customer.accounts.savings}/>
        <div>
          <input ref={toRef} type='text'  placeholder='Pay to'/>
          <input ref={amountRef} type='text' placeholder='Amount' />
            <input type='radio' id='chequing' name='accountType' value='Chequing' onChange={handleChangeAccountType} />
            <label>Chequing</label>
            <input type='radio' id='savings' name='accountType' value='Savings' onChange={handleChangeAccountType} />
            <label>Savings</label>
          <button type='submit' onClick={handlePayBills}>Pay Bills</button>
        </div>
      </div>
    )
  }
}
