import axios from "axios";

export default class Bank {
  // Sets the initial values for the object
  constructor(name = "The Reserve") {
    this.name = name;
    this.customers = [];
  }

  //  registers the newCustomer
  async registerUser(newCustomer) {
    return await fetch("http://localhost:5000/customer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        newCustomer.setId(data.insertedId);
        newCustomer.openAccount("Saving");
      });
  }
// Checks for valid login credentials
  async login(username, password) {
    return await axios
      .get("http://localhost:5000/customer")
      .then((response) => {
        if (username === "admin" && password === "adminpw") {
          localStorage.setItem("admin", "true");
          localStorage.removeItem("userId");
          return "admin";
        } else {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].username === username) {
              if (password === response.data[i].password) {
                localStorage.setItem("admin", "false");
                localStorage.setItem("userId", response.data[i]._id);
                return "customer";
              }
            }
          }
          alert("Invalid Password");
          return;
        }
      });
  }
// set customer list
  setCustomers(customersList) {
    this.customers = customersList;
  }
// get customers
  async getCustomers() {
    const response = await fetch("http://localhost:5000/customer/");
    const data = await response.json();
    return data;
  }

  // get a single customer by id
  async getCustomer(userId) {
    return axios
      .get(`http://localhost:5000/customer/${userId}`)
      .then((response) => {
        return response.data;
      });
  }

  // get account by id
  async getAccount(accountId) {
    const response = await fetch(
      `http://localhost:5000/account/get/${accountId}`
    );
    const data = await response.json();
    return data;
  }

  //  get account by email
  async getAccountByEmail(email) {
    return axios.get("http://localhost:5000/customer").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].email === email) {
          return this.getAccount(response.data[i].accounts.savings[0]);
        }
      }
      return null;
    });
  }
}
