import { v4 as uuid4 } from 'uuid';

export default class Transaction {
  constructor(amount, accountType, to, from) {
    this.id = uuid4();
    this.amount = amount;
    this.accountType = accountType;
    this.to = to;
    this.from = from;
  }

  getInfo() {
    return {
      amount: this.amount,
      accountType: this.accountType,
      to: this.to,
      from: this.from,
    };
  }
}