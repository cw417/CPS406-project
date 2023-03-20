import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar'
import CustomerAccounts from '../comps/CustomerAccounts';
import Customer from '../interfaces/Customer';

export default function Deposit() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const [accountType, setAccountType] = useState('Chequing');
  const navigate = useNavigate();
  const depositRef = useRef();

  function deposit() {
    const amount = parseInt(depositRef.current.value);
    customer.deposit(amount, accountType)
    navigate('/customerPage', {state: { customer: customer } });
  }

  function handleChangeAccountType(event) {
    setAccountType(event.target.value);
  }

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
