# CPS406 Project - The Reserve

## Index

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)

## About

## Installation

1. Ensure Node.js is installed on your system: [NodeJS.dev](https://nodejs.dev/en/)

2. Open a terminal, and clone the repository: 
```bash
git clone https://github.com/cw417/CPS406-project.git
```

3. Change into the newly created `CPS406-project` directory: 
```bash
cd CPS406
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
