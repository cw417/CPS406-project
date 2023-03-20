import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerAccounts from '../components/CustomerAccounts';
import Customer from '../interfaces/Customer';
import Transaction from '../interfaces/Transaction';

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
    if (amount > customer.accounts.chequing) { return; }
    accountType === 'Chequing' ? customer.accounts.chequing -= amount : customer.accounts.savings -= amount;
    const newTransaction = new Transaction(amount, accountType, toRef.current.value, fromRef.current.value);
    customer.transactionHistory.push(newTransaction);
    customer.updateCustomer();
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
