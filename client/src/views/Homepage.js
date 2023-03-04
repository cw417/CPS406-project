import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import CustomerList from '../components/CustomerList';
import { useNavigate } from "react-router-dom";

//function initialCustomers() {
//  return [{
//    name: 'test',
//    address: 'trst',
//    email: 'test',
//    password: 'test',
//    accounts: {
//      chequing: 0,
//      savings: 0 
//    },
//    transactionHistory: []
//  }]
//}

export default function Homepage() {

  const ADMIN_PASSWORD = 'adminpw'
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // get the list of customers from the database
  // set it to the 'customers' state
  // dependencies: runs on every page re-render
  useEffect(() => {
    async function getCustomers() {
      const response = await fetch(`http://localhost:5000/customer/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const newCustomers = await response.json();
      setCustomers(newCustomers);
    }
    getCustomers();
    return;
  }, []);
  
  function handleLogin() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // check given credentials
    if (email == 'admin' && password == ADMIN_PASSWORD) { // if user is admin
      navigate('/admin', {state: {customers: customers}});
    }
    else {
      if (customers.map(customer => customer.email).includes(email)) { // check for matching email
        const foundCustomer = customers.filter(customer => customer.email == email).at(0);
        if (foundCustomer.password == password) { // check for matching password
          navigate('/customerPage', {state: {customer: foundCustomer}});
        }
      }
    }
  }
  
  function handleKeyPress(event, func) {
    /**
     * Calls 'handleLogin()' when 'Enter' key is pressed.
     * The keycode for 'Enter' is 13.
     * @param event  Keypress event watching for 'Enter' key.
     */
    if (event.keyCode === 13 || event.which === 13) {
      handleLogin();
    }
  }

  return (
    <div>
      <Navbar />
      <div className='title'>Homepage</div>
      <div className='login'>
        <input placeholder='Email' type='text' ref={emailRef} onKeyUp={handleKeyPress} />
        <input placeholder='Password' type='text' ref={passwordRef} onKeyUp={handleKeyPress}/>
        <button type='submit' onClick={handleLogin}>Login</button>
      </div>
      <CustomerList customers={customers}/>
    </div>
  )
}