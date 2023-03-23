export default class Account {
    constructor(username, first, last, address, email, password, chequing, savings, id) {
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
  
    getId() {
      return this.id;
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