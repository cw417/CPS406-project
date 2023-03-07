import { useState } from 'react'
import TransactionHistory from './TransactionHistory';

export default function CustomerListEntry({ customer }) {

  const [visibility, setVisibility] = useState('none');

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
        <div>Email: {customer.email}</div>
        <div>Password: {customer.password}</div>
        <div>address: {customer.address}</div>
        <TransactionHistory customer={customer} />
      </div>
    </div>
  )
}
