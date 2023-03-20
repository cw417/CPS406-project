import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Customer from '../interfaces/Customer';
import Navbar from '../components/Navbar'
import CustomerAccounts from '../components/CustomerAccounts';

export default function Deposit() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const [accountType, setAccountType] = useState('chequing');
  const navigate = useNavigate();
  const depositRef = useRef();

  function addToChequing(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    customer.accounts.chequing += amount;
    customer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: 'Chequing', to: 'Deposit', from: 'Deposit'});
  }

  function addToSavings(amount) {
    // add funds to selected account
    // add transaction log to transactionHistory
    customer.accounts.savings += amount;
    customer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: 'Savings', to: 'Deposit', from: 'Deposit'});
  }

  function deposit() {
    const amount = parseInt(depositRef.current.value);
    console.log(accountType);
    accountType === 'chequing' ? addToChequing(amount) : addToSavings(amount);
    depositRef.current.value = null;
    customer.updateCustomer();
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
