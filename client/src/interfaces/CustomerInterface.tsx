export default interface Customer {
  id: string,
  name: string,
  address: string,
  email: string,
  password: string,
  accounts: {
    chequing: number,
    savings: number
  },
  transactionHistory: [
    {
      name: string,
      date: string,
      amount: string,
      fromAccount: string,
      toAccount: string
    }
  ]
}