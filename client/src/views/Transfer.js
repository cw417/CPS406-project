import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import CustomerAccounts from '../components/CustomerAccounts';
import Customer from '../interfaces/Customer';

export default function Transfer() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState('chequing');
  const amountRef = useRef();
  const toRef = useRef();
  const fromRef = useRef();
  
  function transfer() {
    const amount = parseInt(amountRef.current.value);
    if (amount > customer.accounts.chequing) { return; }
    if (accountType === 'chequing') {
      customer.accounts.chequing -= amount;
      const newTransaction = {id: uuidv4(), amount: amount, accountType: 'Chequing', to: toRef.current.value, from: fromRef.current.value };
      customer.transactionHistory.push(newTransaction);
    }
    else {
      customer.accounts.savings -= amount;
      const newTransaction = {id: uuidv4(), amount: amount, accountType: 'Savings', to: toRef.current.value, from: fromRef.current.value };
      customer.transactionHistory.push(newTransaction);
    }
    customer.updateCustomer();
    navigate('/customerPage', {state: { customer: customer }});
  }

  function handleChange(event) {
    setAccountType(event.target.value);
    console.log(accountType);
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Transfer</div>
      <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />
      <div>
        <input type='radio' id='chequing' name='accountType' value='chequing' onChange={handleChange} />
        <label>Chequing</label>
        <input type='radio' id='savings' name='accountType' value='savings' onChange={handleChange} />
        <label>Savings</label>
        <input type='text' ref={toRef} placeholder='To' />
        <input type='text' ref={fromRef} placeholder='From' />
        <input ref={amountRef} type='text' placeholder='Amount' />
        <button type='submit' onClick={transfer}>Transfer</button>
      </div>

    </div>
  )
}
