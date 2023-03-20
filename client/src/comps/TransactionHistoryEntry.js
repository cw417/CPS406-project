import { useNavigate } from 'react-router-dom';

export default function TransactionHistoryEntry({ transaction, removeTransaction }) {

  const navigate = useNavigate();

  function handleRemoveTransaction() {
    console.log(transaction)
    removeTransaction(transaction.id);
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
