import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../comps/Navbar'
import Customer from '../interfaces/Customer';
import axios from 'axios'

export default function EditCustomer() {

  const [ customer, setCustomer ] = useState(null)
  const userId = localStorage.getItem('userId')

  function getCustomer() {
    axios.get(`http://localhost:5000/customer/${userId}`).then(response => {
      console.log(response.data.accounts)
      setCustomer(new Customer(response.data.name, response.data.address, response.data.email, response.data.password, response.data.accounts.chequing, response.data.accounts.savings, response.data.transactionHistory, response.data._id))
    })
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (userId != null) {getCustomer()} else {navigate('/login')}
  }, [])

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
    navigate('/customerPage');
  }

  if (customer === null) {
    return (
    <>
      <h1>Loading...</h1>
    </>)
  } else {
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
}
