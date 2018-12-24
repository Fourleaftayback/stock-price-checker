const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

//mongoDB functions

const findDataDb = (nameOne, nameTwo) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) throw err;
      const db = client.db('freecodecamp');
      db.collection('stock').find({
          $or: [{
            stock_name: nameOne
          }, {
            stock_name: nameTwo
          }]
        })
        .toArray((err, doc) => {
          if (err) throw err;
          resolve(doc);
        });
    })
  })
}


const udpateIpAndLikes = (stock, obj) => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, (err, client) => {
    if (err) throw err;
    const db = client.db('freecodecamp');
    db.collection('stock').findOneAndUpdate({
      stock_name: stock
    }, obj, {
      returnOriginal: false
    }, (err, doc) => {
      if (err) throw err;
      return doc.value;
    });
  })
}


const addNewDoc = (obj) => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, (err, client) => {
    if (err) throw err;
    const db = client.db('freecodecamp');
    db.collection('stock').insertOne(obj, (err, res) => {
      if (err) throw err;
    })
  })
}


exports.findDataDb = findDataDb;
exports.udpateIpAndLikes = udpateIpAndLikes;
exports.addNewDoc = addNewDoc;