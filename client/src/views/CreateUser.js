import { useRef } from 'react'
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

export default function CreateUser({}) {

  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  function handleCreate() {
    console.log("creating new user");
    const newCustomer = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
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

        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>

    </div>
  )
}