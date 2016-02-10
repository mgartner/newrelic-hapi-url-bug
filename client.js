'use strict';

const http = require('http');

//const options = {
//  host: 'localhost',
//  port: 8443,
//  path: '/v1/postcards',
//  auth: 'key_3:'
//};

const options = {
  host: 'localhost',
  port: 3000,
  path: '/hello/postcards'
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
