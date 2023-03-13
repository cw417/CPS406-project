import React from 'react'

export default function CustomerAccounts({ chequing, savings }) {
  return (
    <div>
      <div className='f2'>Accounts</div>
      <div>Chequing: ${chequing}</div>
      <div>Savings: ${savings}</div>
    </div>
  )
}
