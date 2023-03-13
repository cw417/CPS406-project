import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

export default function EditCustomer() {

  const location = useLocation();
  const customer = location.state.customer;
  const navigate = useNavigate();
  const nameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [changePasswordDisplay, setChangePasswordDisplay] = useState('none');

  function toggleChangePasswordDisplay() {
    if (changePasswordDisplay === 'none') {
      setChangePasswordDisplay('block');
    }
    else {
      setChangePasswordDisplay('none')
    }
  }

  async function updateCustomerInfo() {

    const updatedCustomer = { ...customer };
    if (nameRef.current.value) { updatedCustomer.name = nameRef.current.value; }
    if (addressRef.current.value) { updatedCustomer.address = addressRef.current.value; }
    if (emailRef.current.value) { updatedCustomer.email = emailRef.current.value; }
    if (newPasswordRef.current.value) { 
      if (oldPasswordRef.current.value !== customer.password) {
        console.log('Current password does not match given password.');
      }
      else {
        updatedCustomer.password = newPasswordRef.current.value;
      }
    }

    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    navigate('/customerPage', {state: { customer: updatedCustomer } });
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
