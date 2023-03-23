import { v4 as uuidv4 } from 'uuid';

export default class Transaction{
  constructor(amount, accountType, to, from) {
    this.id = uuidv4();
    this.amount = amount;
    this.accountType = accountType;
    this.to = to;
    this.from = from;
  }
}