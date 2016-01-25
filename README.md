# newrelic-hapi-url-bug

This project reproduces a bug in node-newrelic that reports transactions as having URLs of general, `/*`. This bug occurs when a request extension (`onPostAuth`, `onPreresponse`, etc.) calls `request.reply()` within a promise chain.

To replicate the bug, follow the instructions below.

Use Node v5. Install the dependencies:

```
nvm use 5
npm i
```

Edit the node-newrelic module to print out the logged transaction URL. This will allow you to see when the reported route is incorrect.

In the file `node_modules/newrelic/lib/transaction/inde.js` edit the `Transaction.prototype.setName` function to include a `console.log` at the end:

```js
Transaction.prototype.setName = function setName(requestURL, statusCode) {

  // ...

  console.log('this.name:', this.name);
};
```

Start the server.

```
node server.js
```

Run the client.

```
node client.js
```

Notice the transaction URLs printed in the `node server.js` output. Some of them are correctly reported as `WebTransaction/Hapi/GET//hello`, but most of them are incorrectly reported as `WebTransaction/NormalizedUri/*`.
