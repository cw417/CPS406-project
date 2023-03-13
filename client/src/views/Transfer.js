import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { v4 as uuidv4 } from 'uuid';

export default function Transfer() {

  const location = useLocation();
  const [customer, setCustomer] = useState(location.state.customer);
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('chequing');
  const amountRef = useRef();
  const toRef = useRef();
  const fromRef = useRef();
  
  async function transfer() {
    const amount = parseInt(amountRef.current.value);
    if (amount > customer.accounts.chequing) { return; }
    const updatedCustomer = { ...customer };
    if (accountType == 'chequing') {
      updatedCustomer.accounts.chequing -= amount;
      const newTransaction = {id: uuidv4(), amount: amount, accountType: 'Chequing', to: toRef.current.value, from: fromRef.current.value };
      updatedCustomer.transactionHistory.push(newTransaction);
    }
    else {
      updatedCustomer.accounts.savings -= amount;
      const newTransaction = {id: uuidv4(), amount: amount, accountType: 'Savings', to: toRef.current.value, from: fromRef.current.value };
      updatedCustomer.transactionHistory.push(newTransaction);
    }
    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    })
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

        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>

    </div>
  )
}
