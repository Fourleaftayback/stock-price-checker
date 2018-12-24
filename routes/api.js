const expect = require('chai').expect;
const mongoFunc = require('../helpers/mongoFunc');
const helperFunc = require('../helpers/helperFunc');


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {
      console.log('request triggered 1')
      let ip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || 
          req.connection.remoteAddress);
          //.match(/^.*?(?=,)/)[0];
      let likes = req.query.like;
      let stockNames = req.query.stock.toString().toUpperCase();
      let first = /^(\w*)/.exec(stockNames);
      let second = /(\w*)$/.exec(stockNames);

      const stockPrice = helperFunc.getPriceApi(stockNames);
      const dataDB = mongoFunc.findDataDb(first[1], second[1]);

      Promise.all([dataDB, stockPrice])
        .then(data => {
          let stockArr = Object.keys(JSON.parse(data[1]))
          let myData = helperFunc.checkCondi(data[0], data[1], ip, stockArr, likes);
          if (myData.length > 1) {
            let relLikesData = helperFunc.getRelativeLikes(myData);
            res.json({
              'stockData': relLikesData
            })
          }
          res.json({
            "stockData": myData[0]
          });

        })
        .catch(error => {
          console.log(error.message)
        });

    });


  app.route('/stock')
    .get(function (req, res) {
      console.log('request triggered 2')
      let ip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || 
          req.connection.remoteAddress);
          //.match(/^.*?(?=,)/)[0];
      let likes = req.query.like;
      let stockNames = req.query.stock.toString().toUpperCase();
      let first = /^(\w*)/.exec(stockNames);
      let second = /(\w*)$/.exec(stockNames);

      const stockPrice = helperFunc.getPriceApi(stockNames);
      const dataDB = mongoFunc.findDataDb(first[1], second[1]);

      Promise.all([dataDB, stockPrice])
        .then(data => {
          let stockArr = Object.keys(JSON.parse(data[1]))
          let myData = helperFunc.checkCondi(data[0], data[1], ip, stockArr, likes);
          if (myData.length > 1) {
            let relLikesData = helperFunc.getRelativeLikes(myData);
            res.json({
              'stockData': relLikesData
            })
          }
          res.json({
            "stockData": myData[0]
          });
        })
        .catch(error => {
          console.log(error.message)
        });

    })


};