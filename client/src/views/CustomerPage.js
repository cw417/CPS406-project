import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerTransactionHistory from '../components/CustomerTransactionHistory';

export default function CustomerPage({}) {

  // get the customer from React Router
  const location = useLocation();
  const customer = location.state.customer;
  const navigate = useNavigate();
  
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
          <button onClick={() => { navigate('/transfer', {state: { customer: customer } }); } }>Transfer</button>
          <button onClick={() => { navigate('/deposit', {state: { customer: customer } }); } }>Deposit</button>
        </div>

        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>

      </div>
      <CustomerTransactionHistory customer={customer} />
    </div>
  )
}
