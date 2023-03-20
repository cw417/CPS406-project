import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar';
import CustomerAccounts from '../comps/CustomerAccounts';
import Customer from '../interfaces/Customer';

export default function Transfer() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState('Chequing');
  const amountRef = useRef();
  const toRef = useRef();
  const fromRef = useRef();
  
  function transfer() {
    const amount = parseInt(amountRef.current.value);
    customer.transfer(amount, accountType, toRef.current.value, fromRef.current.value);
    navigate('/customerPage', {state: { customer: customer }});
  }

  function handleChange(event) {
    setAccountType(event.target.value);
  }

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
