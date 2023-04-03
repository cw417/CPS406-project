import Account from "./Account";

export default class Customer {
  // Sets the initial values for the object
  constructor(
    username,
    first,
    last,
    address,
    email,
    password,
    chequing,
    savings,
    payees = [],
    contacts = [],
    id = ""
  ) {
    this.id = id;
    this.username = username;
    this.first = first;
    this.last = last;
    this.address = address;
    this.email = email;
    this.password = password;
    this.accounts = {
      chequing: chequing,
      savings: savings,
    };
    this.payees = payees;
    this.contacts = contacts;
  }

  // Adds the contact into the list
  addContact(contact) {
    this.contacts.push(contact);
    this.updateCustomer();
  }

  // Adds the contact from the list
  removeContact(contact) {
    const index = this.contacts.indexOf(contact);
    this.contacts.splice(index);
    this.updateCustomer();
  }

  // Adds the payee into the list
  addPayee(payee) {
    this.payees.push(payee);
    this.updateCustomer();
  }

  // Remove the payee into the list
  removePayee(payee) {
    const index = this.payees.indexOf(payee);
    this.payees.splice(index);
    this.updateCustomer();
  }
  // set Id
  setId(id) {
    this.id = id;
  }
  // get Id
  getId() {
    return this.id;
  }

  getInfo() {
    return {
      username: this.username,
      first: this.first,
      last: this.last,
      address: this.address,
      email: this.email,
    };
  }

  getChequing() {
    return this.accounts.chequing;
  }

  getSavings() {
    return this.accounts.savings;
  }

  async openAccount(type) {
    const data = { accountType: type };

    await fetch(`http://localhost:5000/account/add/${this.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (type === "Chequing") {
          this.accounts.chequing.push(data.insertedId);
        } else {
          this.accounts.savings.push(data.insertedId);
        }
      });
    this.updateCustomer();
  }

  async getAccounts() {
    return fetch(`http://localhost:5000/account/${this.id}`)
      .then((response) => response.json())
      .then((data) => {
        var cAccounts = [];
        var sAccounts = [];
        data.forEach((account) => {
          if (account.accountType === "Chequing") {
            var tempAccount1 = new Account(
              account._id,
              account.accountType,
              account.customerId,
              account.accountBalance,
              account.maxTransferAmount,
              account.transactionHistory
            );
            cAccounts.push(tempAccount1);
          } else {
            var tempAccount2 = new Account(
              account._id,
              account.accountType,
              account.customerId,
              account.accountBalance,
              account.maxTransferAmount,
              account.transactionHistory
            );
            sAccounts.push(tempAccount2);
          }
        });
        return { cAccounts, sAccounts };
      });
  }

  async updateCustomer() {
    await fetch(`http://localhost:5000/update/${this.id}`, {
      method: "POST",
      body: JSON.stringify({
        username: this.username,
        first: this.first,
        last: this.last,
        address: this.address,
        email: this.email,
        password: this.password,
        accounts: {
          chequing: this.accounts.chequing,
          savings: this.accounts.savings,
        },
        payees: this.payees,
        contacts: this.contacts,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async removeCustomer() {
    await fetch(`http://localhost:5000/remove/${this.id}`, {
      method: "DELETE",
    });
  }
}
