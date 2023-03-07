import React from 'react'
import TransactionHistoryEntry from './TransactionHistoryEntry'

export default function TransactionHistory({ customer }) {

  function removeTransaction(transaction) {
    newCustomer = { ...customer };
  }

  function renderTransactionHistory() {
    /**
     * Map recipes to a list of recipe components.
     */
    return customer.transactionHistory.map((transaction, index) => {
      return (
        <div key={index}><TransactionHistoryEntry transaction={transaction} removeTransaction={removeTransaction} /></div>
      )
    })
  }
  return (
    <div>
      <div>Transaction History</div>
      <div>{renderTransactionHistory()}</div>
    </div>
  )
}
