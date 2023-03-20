import CustomerAccounts from '../comps/CustomerAccounts'
import Navbar from '../comps/Navbar'
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Customer from '../interfaces/Customer';
import Transaction from '../interfaces/Transaction';

export default function PayBills() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const navigate = useNavigate();

  const toRef = useRef();
  const amountRef = useRef();
  const [accountType, setAccountType] = useState('Chequing');

  function handlePayBills() {
    const amount = parseInt(amountRef.current.value);
    accountType === 'Chequing' ? customer.accounts.chequing -= amount : customer.accounts.savings -= amount;
    const newTransaction = new Transaction(amount, accountType, toRef.current.value, customer.name);
    customer.transactionHistory.push(newTransaction);
    customer.updateCustomer();
    navigate('/customerPage', {state: { customer: customer }});
  }

  function handleChangeAccountType(event) {
    setAccountType(event.target.value);
  }

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
