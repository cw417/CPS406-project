export default function CustomerTransactionHistoryEntry({ transaction, removeTransaction }) {

  return (
    <div>
      <div>
        <div>${transaction.amount} Account: {transaction.accountType} To: {transaction.to} From: {transaction.from}</div>
      </div>
    </div>
  )
}
