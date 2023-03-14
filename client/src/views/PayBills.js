import CustomerAccounts from '../components/CustomerAccounts'
import Navbar from '../components/Navbar'
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


export default function PayBills() {

  const location = useLocation();
  const customer = location.state.customer;
  const navigate = useNavigate();
  const toRef = useRef();
  const amountRef = useRef();
  const [accountType, setAccountType] = useState('chequing');

  
  async function handlePayBills() {
    const updatedCustomer = {...customer};
    const amount = parseInt(amountRef.current.value);
    if (accountType === 'chequing') {
      updatedCustomer.accounts.chequing -= amount;
    }
    else {
      updatedCustomer.accounts.savings -= amount;
    }
    updatedCustomer.transactionHistory.push({id: uuidv4(), amount: amount, accountType: accountType, to: toRef.current.value, from: customer.name});
    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    })
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
