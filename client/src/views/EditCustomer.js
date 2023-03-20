import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Customer from '../interfaces/Customer';

export default function EditCustomer() {

  const location = useLocation();
  const loc = location.state.customer;
  const customer = new Customer(loc.name, loc.address, loc.email, loc.password, loc.accounts.chequing, loc.accounts.savings, loc.transactionHistory);
  customer.setDBID(loc._id);

  const nameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [changePasswordDisplay, setChangePasswordDisplay] = useState('none');

  const navigate = useNavigate();

  function toggleChangePasswordDisplay() {
    if (changePasswordDisplay === 'none') {
      setChangePasswordDisplay('block');
    }
    else {
      setChangePasswordDisplay('none')
    }
  }

  function updateCustomerInfo() {

    if (nameRef.current.value) { customer.name = nameRef.current.value; }
    if (addressRef.current.value) { customer.address = addressRef.current.value; }
    if (emailRef.current.value) { customer.email = emailRef.current.value; }
    if (newPasswordRef.current.value) { 
      if (oldPasswordRef.current.value !== customer.password) {
        console.log('Current password does not match given password.');
      }
      else {
        customer.password = newPasswordRef.current.value;
      }
    }
    customer.updateCustomer();
    navigate('/customerPage', {state: { customer: customer } });
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Edit Account Details</div>
      <div>
        <div>
          <label>Name: </label>
          <input type='text' ref={nameRef} placeholder={customer.name} />
        </div>
        <div>
          <label>Address: </label>
          <input type='text' ref={addressRef} placeholder={customer.address} />
        </div>
        <div>
          <label>Email: </label>
          <input type='text' ref={emailRef} placeholder={customer.email} />
        </div>
        <button onClick={toggleChangePasswordDisplay}>Change Password</button>
        <div style={{display: changePasswordDisplay}}>
          <input type='text' placeholder='Old password' ref={oldPasswordRef} />
          <input type='text' placeholder='New password' ref={newPasswordRef} />
        </div>
        <button type='submit' onClick={updateCustomerInfo}>Update</button>
      </div>

    </div>
  )
}
