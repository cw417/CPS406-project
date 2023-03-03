import React, { useState, useEffect } from 'react'

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function getCustomers() {
      const response = await fetch(`http://localhost:5000/customer/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const customers = await response.json();
      setCustomers(customers);
    }
  
    getCustomers();
  
    return;
  }, [customers.length]);

  function customerList() {
    /**
     * Map recipes to a list of recipe components.
     */
    console.log("creating customer list")
    return customers.map((customer, index) => {
      return (
        <div key={index}>{customer.name}</div>
      )
    })
  }

  return (
    <div>CustomerList
      {customerList()}
    </div>
  )
}
