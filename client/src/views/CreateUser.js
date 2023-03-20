import { useRef } from 'react'
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';
import Customer from '../interfaces/Customer'

export default function CreateUser({}) {

  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  function handleCreate() {
    /**
     * Create a new customer object with the current input values, and add it to the database.
     * Chequing accounts is set to 0.
     * Savings account is set to 0.
     * Transaction history is set to an empty array.
     */
    console.log("creating new user");
    const newCustomer = new Customer(nameRef.current.value, addressRef.current.value, emailRef.current.value, passwordRef.current.value, 0, 0, [])
    createUser(newCustomer);
  }

  async function createUser(newCustomer) {

    console.log(`Adding: ${newCustomer.name}`);

    await fetch('http://localhost:5000/customer/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    navigate('/');
  }

  return (
    <div>
      <Navbar />
      <div className='title'>
        <div>Create Account</div>
      </div>
      <div className='create-account-form'>
        <input type='text' ref={nameRef} placeholder='Name'></input>
        <input type='text' ref={emailRef} placeholder='Email'></input>
        <input type='text' ref={passwordRef} placeholder='Password'></input>
        <input type='text' ref={addressRef} placeholder='Address'></input>
        <button type='submit' onClick={handleCreate}>Submit</button>
      </div>

    </div>
  )
}