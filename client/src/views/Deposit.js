import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Navbar from '../components/Navbar'
import CustomerAccounts from '../components/CustomerAccounts';
import BackButton from '../components/BackButton';

export default function Deposit() {

  const location = useLocation();
  const [customer, setCustomer] = useState(location.state.customer);
  const [accountType, setAccountType] = useState('chequing');
  const navigate = useNavigate();
  const depositRef = useRef();
  const accountRef = useRef();

  function addToChequing(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    const newCustomer = { ...customer };
    newCustomer.accounts.chequing += amount;
    newCustomer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: 'Chequing', to: 'Deposit', from: 'Deposit'});
    setCustomer(newCustomer);
  }

  function addToSavings(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    const newCustomer = { ...customer };
    newCustomer.accounts.savings += amount;
    newCustomer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: 'Savings', to: 'Deposit', from: 'Deposit'});
    setCustomer(newCustomer);
  }

  async function deposit() {
    const amount = parseInt(depositRef.current.value);
    console.log(accountType)
    if (accountType == 'chequing') {
      addToChequing(amount);
    }
    else {
      addToSavings(amount);
    }
    depositRef.current.value = null;
    const updatedCustomer = {...customer};
    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    navigate('/customerPage', {state: { customer: customer } });
  }

  function handleChangeAccountType(event) {
    setAccountType(event.target.value);
    console.log(accountType);
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Deposit</div>
      <CustomerAccounts chequing={customer.accounts.chequing} savings={customer.accounts.savings} />
      <div>
        <input ref={depositRef} type='text' placeholder={"Amount"} />
          <input type='radio' id='chequing' name='accountType' value='chequing' onChange={handleChangeAccountType} />
          <label>Chequing</label>
          <input type='radio' id='savings' name='accountType' value='savings' onChange={handleChangeAccountType} />
          <label>Savings</label>
          <button type='submit' onClick={deposit}>Deposit</button>
      </div>

    </div>
  )
}
