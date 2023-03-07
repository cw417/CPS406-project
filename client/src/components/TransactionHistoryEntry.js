import React from 'react'

export default function TransactionHistoryEntry({ transaction, removeTransaction }) {

  function handleRemoveTransaction() {
    removeTransaction()
  }
  return (
    <div>
      <div>
        <div>${transaction.amount} Account: {transaction.accountType} To: {transaction.to} From: {transaction.from}</div>
        <button onClick={handleRemoveTransaction}>DELETE</button>
      </div>
    </div>
  )
}
