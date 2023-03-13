export default interface Transaction{
  id: string, // UUID
  amount: number,
  accountType: string, // 'Chequing' or 'Savings'
  to: string,
  from: string
}