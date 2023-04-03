import { v4 as uuid4 } from "uuid";

export default class Transaction {
  // Sets the initial values for the object
  constructor(amount, accountType, to, from, type) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    this.date = `${currentDay} ${currentMonth} ${currentYear}`;
    this.id = uuid4();
    this.amount = amount;
    this.accountType = accountType;
    this.type = type;
    this.to = to;
    this.from = from;
  }
  // returns part of the attributes
  getInfo() {
    return {
      date: this.date,
      amount: this.amount,
      accountType: this.accountType,
      type: this.type,
      to: this.to,
      from: this.from,
    };
  }
}
