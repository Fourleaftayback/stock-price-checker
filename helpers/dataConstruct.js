//constructors

function NoDataUpdate(name, ip, likes) {
  this.stock_name = name;
  this.client_ip = (function () {
    if (likes === undefined) {
      return [];
    }
    return [ip];
  }())
  this.likes = (function () {
    if (likes === undefined) {
      return 0;
    }
    return 1;
  }())
}

function AddIpAndLike(ip) {
  this.$push = {
      client_ip: ip
    },
    this.$inc = {
      likes: 1
    }
}

function ReturnData(stockName, price, likes) {
  this.stock = stockName,
    this.price = price,
    this.likes = (function () {
      if (likes === undefined) {
        return 0;
      } else if (likes === 'true') {
        return 1;
      } else {
        return likes;
      }
    }())
}


exports.NoDataUpdate = NoDataUpdate;
exports.AddIpAndLike = AddIpAndLike;
exports.ReturnData = ReturnData;