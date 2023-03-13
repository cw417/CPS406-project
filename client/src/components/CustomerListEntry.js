import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TransactionHistory from './TransactionHistory';

export default function CustomerListEntry({ customer }) {

  const [visibility, setVisibility] = useState('none');
  const navigate = useNavigate();

  function toggleVisibility() {
    if (visibility == 'none') {
      setVisibility('block');
    }
    else {
      setVisibility('none');
    }
  }

  return (
    <div>
      <div>{customer.name}</div>
      <button onClick={toggleVisibility}>+</button>
      <div style={{display:visibility}}>
        <div>
          <button onClick={() => { navigate('/editCustomer', {state: { customer: customer } }); } }>Edit Customer</button>
        </div>
        <div>Email: {customer.email}</div>
        <div>Password: {customer.password}</div>
        <div>address: {customer.address}</div>
        <TransactionHistory customer={customer} />
      </div>
    </div>
  )
}
