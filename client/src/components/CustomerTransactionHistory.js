import React from 'react'
import CustomerTransactionHistoryEntry from './CustomerTransactionHistoryEntry'

export default function CustomerTransactionHistory({ customer }) {

  function renderTransactionHistory() {
    /**
     * Map recipes to a list of recipe components.
     */
    return customer.transactionHistory.map((transaction, index) => {
      return (
        <div key={index}><CustomerTransactionHistoryEntry transaction={transaction} /></div>
      )
    })
  }
  return (
    <div>
      <div>{renderTransactionHistory()}</div>
    </div>
  )
}
