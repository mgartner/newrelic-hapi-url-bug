# newrelic-hapi-url-bug

This project reproduces a bug in node-newrelic that incorrectly reports transactions with URLs of `/*`. This bug occurs when a request extension (`onPostAuth`, `onPreresponse`, etc.) calls `request.reply()` within a promise chain, and concurrent requests are being handled by the server.

To replicate the bug, follow the instructions below.

Use Node v5 and install the dependencies:

```
nvm use 5
npm i
```

Edit the node-newrelic module to print out the logged transaction URL. This will allow you to see when the logged transaction is incorrect.

In the file `node_modules/newrelic/lib/transaction/index.js` edit the `Transaction.prototype.setName` function to include a `console.log` at the end:

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

### Workaround

I've found a quick work-around to avoid the issue, by calling `NewRelic.setTransactionName` in the `onPostAuth` hook of a Hapi server. Look at `server.workaround.js` for an example.
