import React from 'react'

export default function TransactionHistory({ customer }) {

  function renderTransactionHistory() {
    /**
     * Map recipes to a list of recipe components.
     */
    return customer.transactionHistory.map((transaction, index) => {
      return (
        <div key={index}>{transaction.amount}</div>
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
