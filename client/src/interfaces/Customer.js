import Account from "./Account";

export default class Customer {
  constructor(username, first, last, address, email, password, chequing, savings, id = "") {
    this.id = id;
    this.username = username;
    this.first = first;
    this.last = last;
    this.address = address;
    this.email = email;
    this.password = password;
    this.accounts = {
      chequing: chequing,
      savings: savings
    }
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return {username: this.username, first: this.first, last: this.last, address: this.address, email: this.email};
  }

  getChequing() {
    return this.accounts.chequing;
  }

  getSavings() {
    return this.accounts.savings;
  }

  async openAccount(type) {
    const data = {accountType: type}

    await fetch(`http://localhost:5000/account/add/${this.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json()).then((data) => {
      if (type === 'Chequing') {
        this.accounts.chequing.push(data.insertedId)
      } else {
        this.accounts.savings.push(data.insertedId)
      }
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    this.updateCustomer()
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
          savings: this.accounts.savings
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })

  }
}
