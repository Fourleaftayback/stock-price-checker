# Stock Price Checker

This page provides stock prices from an api. You can add a likes to stock and provide a relative number to the other stock. Only allow loading of scripts and css from your server.

###User Stories

1. Set the content security policies to only allow loading of scripts and css from your server.
2. I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
3. In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
4. I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
5. If I pass along 2 stocks, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference between the likes on both) on both.
6. A good way to receive current price is the following external API(replacing 'GOOG' with your stock): https://finance.google.com/finance/info?q=NASDAQ%3aGOOG
7. All 5 functional tests are complete and passing.

[Stock Price Checker](https://surf-hyacinth.glitch.me/)

This was built with Node, Express, MongoDB, and Chai.
