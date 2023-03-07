import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TransactionHistory from '../components/TransactionHistory';

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const [customer, setCustomer] = useState(location.state.customer);
  const [accountType, setAccountType] = useState('chequing');
  const navigate = useNavigate();
  const depositRef = useRef();
  
  function addToChequing(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    const newCustomer = { ...customer };
    newCustomer.accounts.chequing += amount;
    newCustomer.transactionHistory.push({amount: amount, accountType: 'Chequing', to: 'Deposit', from: 'Deposit'});
    setCustomer(newCustomer);
  }

  function addToSavings(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    const newCustomer = { ...customer };
    newCustomer.accounts.savings += amount;
    newCustomer.transactionHistory.push({amount: amount, accountType: 'Savings', to: 'Deposit', from: 'Deposit'});
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
  }

  function toTransfer() {
    navigate('/transfer', {state: { customer: customer } });
  }

  function handleChange(event) {
    setAccountType(event.target.value);
    console.log(accountType);
  }

  return (
    <div>
      <Navbar />
      <div className='title'>{customer.name}</div>
      <div className='center'>
        <div>
          <div className='f2'>Accounts</div>
          <div>Chequing: {customer.accounts.chequing}</div>
          <div>Savings: {customer.accounts.savings}</div>
        </div>

        <div>
          <input type='text' ref={depositRef}/>
          <input type='radio' id='chequing' name='accountType' value='chequing' onChange={handleChange} />
          <label>Chequing</label>
          <input type='radio' id='savings' name='accountType' value='savings' onChange={handleChange} />
          <label>Savings</label>
          <button type='submit' onClick={deposit}>Deposit</button>
        </div>

        <div>
          <button onClick={toTransfer}>Make Transfer</button>
        </div>

        <TransactionHistory customer={customer} />
      </div>
    </div>
  )
}
