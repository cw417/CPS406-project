# CPS406 Project - The Reserve

## Index

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Ensure Node.js is installed on your system: [NodeJS.dev](https://nodejs.dev/en/)

2. Open a terminal, and clone the repository: 
```bash
git clone https://github.com/cw417/CPS406-project.git
```

3. Change into the newly created `CPS406-project` directory: 
```bash
cd CPS406-project/
```

4. Install dependencies in both the `client/` and `server/` folders:

```bash
cd client/
npm install
cd ../server/
npm install
```

5. A `server/config.env` file with the relevant database connection information is required to make a connection with the MongoDB Atlas cloud database. Please ensure that the provided `config.env` file is located inside the `server/` directory before attempting to start the database server.

6. Start the database connection with `node` from the `server/` folder: 

```bash
node server.js
```

7. The server should show the following message on screen if the server has started correctly:

```bash
Server is running on port: 5000
Successfully connected to MongoDB.
```

8. With the database server still running, open another terminal, and change back into the main directory of the project. Next, change into the `client/` directory and start the client-side server:

```bash
cd client/
npm start
```

9. If the server starts correctly, the application can now be found at: `http://localhost:3000/` using your preferred web browser.

## Usage

To use The Reserve, you will first need to create an account.

### Create Account

1. Click the red "Get Started" button on the homepage to navigate to the Account Creation page.

2. Fill in the form on the Account Creation page, and click the "Sign Up" button at the bottom of the page. The browser will now navigate to the Login page.

3. On the Login page, fill out the Username and Passwords for the newly created account, and click "Login".

4. The browser will navigate to the Customer Dashboard page, where a Savings Account will have been opened for the new customer account.

5. A Chequing Account can be opened by clicking the "Open Account" button.

6. The "Quick Actions" menu displays the available options of Transfer, Pay Bills, and Deposit. The menu is set to Deposit by default, so this is the action displayed on the page when it is first loaded.

### Deposit

1. Ensure that the Quick Actions menu has selected the Deposit option. 

2. Enter the file containing the cheque to be deposited.

3. Select the account to deposit to.

4. Enter the amount of the deposit.

5. Click the "Make deposit" button to complete the deposit.

6. The money will now be visible in the relevant account inside of the Account Overview section of the Customer Dashboard.

### Transfer

1. Ensure that the Quick Actions menu has selected the Transfer option. 

2. Select the sender account under the "From" dropdown menu.

3. Select the receiver account under the "To" dropdown menu.

4. Enter the amount to transfer. 

5. Click the "Make transfer" button to complete the transfer.

### Pay Bills

1. Ensure that the Quick Actions menu has selected the Pay Bills option. 

2. Select the sender account under the "From" dropdown menu.

3. Select the payee under the "To" dropdown menu.

4. Enter the amount to pay. 

5. Click the "Make payment" button to complete the transfer.

### Add Contact

1. Ensure that the Quick Actions menu has selected the Transfer option. 

2. Click the "Add Contact" button to navigate to the Add Payee/Contact page.

3. Enter the name of the contact.

4. Enter the email of the contact.

5. Confirm the email of the contact.

6. Click the "Complete" button to add the contact.

- Test contact:
```
Name: Test Account
Email: Tester@test.com
```

### Add Payee

1. Ensure that the Quick Actions menu has selected the Pay Bills option. 

2. Click the "Add Payee" button to navigate to the Add Payee/Contact page.

3. Enter the payee name.

4. Enter the payee account number.

5. Click the "Complete" button to add the payee.

- Test payee:
```
Payee Name: Test Account
Account Number: 8675607171634108
```

