export default class Account {
  constructor(
    id,
    accountType,
    customerId,
    accountBalance,
    maxTransferAccount,
    transactionHistory
  ) {
    this.id = id;
    this.accountType = accountType;
    this.customerId = customerId;
    this.accountBalance = accountBalance;
    this.maxTransferAccount = maxTransferAccount;
    this.transactionHistory = transactionHistory;
  }

  setAccountBalance(newVal) {
    this.accountBalance = newVal;
  }
  
  addTransaction(transaction) { 
    this.transactionHistory.push(transaction);
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return {
      accountType: this.accountType,
      customerId: this.customerId,
      accountBalance: this.accountBalance,
      maxTransferAccount: this.maxTransferAccount,
      transactionHistory: this.transactionHistory,
    };
  }

  async updateAccount() {
    await fetch(`http://localhost:5000/account/update/${this.id}`, {
      method: "POST",
      body: JSON.stringify({
        accountType: this.accountType,
        customerId: this.customerId,
        accountBalance: this.accountBalance,
        maxTransferAccount: this.maxTransferAccount,
        transactionHistory: this.transactionHistory,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
