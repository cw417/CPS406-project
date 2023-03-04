import { useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const params = useParams();
  const [customer, setCustomer] = useState(location.state.customer);

  const depositRef = useRef();

  function deposit() {
    // add funds to selected account
    // add transaction log to transactionHistory
    const newCustomer = {...customer};
    newCustomer.accounts.chequing += parseInt(depositRef.current.value);
    setCustomer(newCustomer);
    handleSubmit();
  }
  
  async function handleSubmit() {
    const updatedCustomer = {...customer};
    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    });
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
          <button type='submit' onClick={deposit}>+</button>
        </div>
      </div>
    </div>
  )
}
