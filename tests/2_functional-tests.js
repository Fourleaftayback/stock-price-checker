/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');



chai.use(chaiHttp);

suite('Functional Tests', function() {
    let testLikes, relativeLikes;
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body.stockData, 'response should be an Object');
          assert.property(res.body.stockData.stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData.price, 'price', 'should be the price amount');
          assert.property(res.body.stockData.likes, 'likes', 'should be the likes count');
          assert.equal(res.body.stockData.stock, 'GOOG', 'should be equal to GOOG');
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body.stockData, 'response should be an Object');
          assert.property(res.body.stockData.stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData.price, 'price', 'should be the price amount');
          assert.property(res.body.stockData.likes, 'likes', 'should be the likes count');
          assert.equal(res.body.stockData.stock, 'GOOG', 'should be equal to GOOG');
          assert.isAbove(res.body.stockData.likes, 0, 'likes should be more than one');
          testLikes = res.body.stockData.likes;
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.likes, testLikes, 'the likes should not counted again')
          done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog,msft'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData, 'response should be an Array');
          assert.isObject(res.body.stockData[0], 'response should be an Object');
          assert.property(res.body.stockData[0].stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData[0].price, 'price', 'should be the price amount');
          assert.property(res.body.stockData[0].likes, 'likes', 'should be the likes count');
          assert.equal(res.body.stockData.stock[0], 'GOOG', 'should be equal to GOOG');
          assert.property(res.body.stockData[1].stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData[1].price, 'price', 'should be the price amount');
          assert.property(res.body.stockData[1].likes, 'likes', 'should be the likes count'); 
          assert.equal(res.body.stockData.stock[1], 'MSFT', 'should be equal to MSFT');       
          done();
        });  
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog,msft', like: true})
        .end((err, res) => {
          assert.equal(res.status, 200);
          relativeLikes = res.body.stockData[0].rel_likes - res.body.stockData[1].rel_likes;
          assert.isArray(res.body.stockData, 'response should be an Array');
          assert.isObject(res.body.stockData[0], 'response should be an Object');
          assert.property(res.body.stockData[0].stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData[0].price, 'price', 'should be the price amount');
          assert.property(res.body.stockData[0].rel_likes, 'rel_likes', 'should be the likes count');
          assert.equal(res.body.stockData[0].rel_likes, relativeLikes, 'this number should mathch')
          assert.equal(res.body.stockData.stock[0], 'GOOG', 'should be equal to GOOG'); 
          assert.equal(res.body.stockData.stock[1], 'MSFT', 'should be equal to MSFT');
          assert.property(res.body.stockData[1].stock, 'stock', 'should be the stock name');
          assert.property(res.body.stockData[1].price, 'price', 'should be the price amount');
          assert.property(res.body.stockData[1].rel_likes, 'rel_likes', 'should be the likes count');       
          done();
        }); 
      });
      
    });

});
