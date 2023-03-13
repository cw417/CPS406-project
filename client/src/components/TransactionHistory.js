import TransactionHistoryEntry from './TransactionHistoryEntry'

export default function TransactionHistory({ customer }) {

  async function removeTransaction(id) {
    const updatedCustomer = { 
      ...customer, 
      transactionHistory: customer.transactionHistory.filter(transaction => transaction.id !== id)
    };
    const transactions = customer.transactionHistory.filter(transaction => transaction.id === id);
    const transaction = transactions[0];
    if (transaction.accountType === 'Chequing') {updatedCustomer.accounts.chequing -= transaction.amount};
    if (transaction.accountType === 'Savings') {updatedCustomer.accounts.savings -= transaction.amount};
    await fetch(`http://localhost:5000/update/${customer._id}`, {
      method: "POST",
      body: JSON.stringify(updatedCustomer),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    
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
