const express = require('express');
const recipeRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
 
// Get a list of all the customers.
recipeRoutes.route('/customer').get(function (req, res) {
  let db_connect = dbo.getDb('theReserve');
  db_connect
    .collection('customers')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Get a single customer by id
recipeRoutes.route('/customer/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection('customers')
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Create a new customer.
recipeRoutes.route('/customer/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    accounts: {
      chequing: 0,
      savings: 0
    },
    transactionHistory: []
  };
  db_connect.collection('customers').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
//// Update a recipe by id.
//recipeRoutes.route('/update/:id').post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      ingredients: req.body.ingredients,
//      instructions: req.body.instructions,
//    },
//  };
//  db_connect
//    .collection('recipes')
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log('1 document updated');
//      response.json(res);
//    });
//});
// 
//// Delete a recipe
//recipeRoutes.route('/:id').delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection('recipes').deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log('1 document deleted');
//    response.json(obj);
//  });
//});
// 
module.exports = recipeRoutes;