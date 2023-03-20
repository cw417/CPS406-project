import CustomerAccounts from '../components/CustomerAccounts'
import Navbar from '../components/Navbar'
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Customer from '../interfaces/Customer';


export default function PayBills() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const navigate = useNavigate();

  const toRef = useRef();
  const amountRef = useRef();
  const [accountType, setAccountType] = useState('chequing');

  function handlePayBills() {
    const amount = parseInt(amountRef.current.value);
    if (accountType === 'chequing') {
      customer.accounts.chequing -= amount;
    }
    else {
      customer.accounts.savings -= amount;
    }
    customer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: accountType, to: toRef.current.value, from: customer.name});
    customer.updateCustomer();
    navigate('/customerPage', {state: { customer: customer }});
  }

  function handleChangeAccountType(event) {
    setAccountType(event.target.value);
    console.log(accountType);
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Pay Bills</div>
      <CustomerAccounts  chequing={customer.accounts.chequing} savings={customer.accounts.savings}/>
      <div>
        <input ref={toRef} type='text'  placeholder='Pay to'/>
        <input ref={amountRef} type='text' placeholder='Amount' />
          <input type='radio' id='chequing' name='accountType' value='chequing' onChange={handleChangeAccountType} />
          <label>Chequing</label>
          <input type='radio' id='savings' name='accountType' value='savings' onChange={handleChangeAccountType} />
          <label>Savings</label>
        <button type='submit' onClick={handlePayBills}>Pay Bills</button>
      </div>
    </div>
  )
}
