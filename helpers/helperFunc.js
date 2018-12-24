const request = require('request');
const dataContruct = require('./dataConstruct');
const mongoFunc = require('./mongoFunc');

const getPriceApi = (names) => {
  return new Promise((resolve, reject) => {
    request(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${names}&types=price`, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    })
  });
}

const checkCondi = (data, apiData, ip, keys, likes) => {
  let apiObj = JSON.parse(apiData);
  let arr = [];

  for (i = 0; i < keys.length; i++) {
    if (data.length === 0 || keys[i] !== data[i].stock_name) {
      let noData = new dataContruct.NoDataUpdate(keys[i], ip, likes);
      mongoFunc.addNewDoc(noData);
      let retDoc = new dataContruct.ReturnData(keys[i], apiObj[keys[i]].price, likes);
      arr.push(retDoc);
    } else if (keys[i] === data[i].stock_name && likes === 'true' && !data[i].client_ip.includes(ip)) {
      let udpateData = new dataContruct.AddIpAndLike(ip);
      mongoFunc.udpateIpAndLikes(keys[i], udpateData);
      let retDoc = new dataContruct.ReturnData(keys[i], apiObj[keys[i]].price, data[i].likes + 1);
      arr.push(retDoc);
    } else {
      let retDoc = new dataContruct.ReturnData(keys[i], apiObj[keys[i]].price, data[i].likes);
      arr.push(retDoc);
    }

  }
  return arr;
}

const getRelativeLikes = (arr) => {
  return [{
      stock: arr[0].stock,
      price: arr[0].price,
      rel_likes: arr[0].likes - arr[1].likes
    },
    {
      stock: arr[1].stock,
      price: arr[1].price,
      rel_likes: arr[1].likes - arr[0].likes
    }
  ]
}

exports.getPriceApi = getPriceApi;
exports.checkCondi = checkCondi;
exports.getRelativeLikes = getRelativeLikes;