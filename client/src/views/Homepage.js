import React, { useRef } from 'react'
import Navbar from '../components/Navbar';
import CustomerList from '../components/CustomerList';


export default function Homepage({}) {
  
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <Navbar />
      <div className='title'>Homepage</div>
      <div className='login'>
        <input placeholder='Username' type='text' ref={usernameRef} />
        <input placeholder='Password' type='text' ref={passwordRef} />
      </div>
      <CustomerList />
    </div>
  )
}