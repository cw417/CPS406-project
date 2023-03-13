import React from 'react'

export default function CustomerDetails({ customer }) {
  return (
    <div>
      <div>Name: {customer.name} </div>
      <div>Address: {customer.address} </div>
      <div>Email: {customer.email} </div>
    </div>
  )
}
