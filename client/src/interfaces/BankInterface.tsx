import Customer from "./Customer"

export default interface Bank {
  name: string,
  customer: [Customer]
}