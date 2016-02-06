'use strict';

const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/hello/mario'
};

let callback = (response) => {
  let str = '';

  response.on('data', (chunk) => {
    str += chunk;
  });

  response.on('end', () => {
    console.log(str);
  });
};

http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
