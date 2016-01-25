'use strict';

require('newrelic');

const Bluebird = require('bluebird');
const Hapi     = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.ext('onPostAuth', (request, reply) => {
  Bluebird.resolve()
  .then(() => {
    reply.continue();
  });

  //setTimeout(() => {
  //  reply.continue();
  //}, Math.floor(Math.random() * 5000));
  //Bluebird.resolve()
  //.then(() => {
  //  console.log('extension');
  //});
  //reply.continue();
});

//server.register({
//  register: (server, options, next) => {
//    server.ext('onPostAuth', (request, reply) => {
//      console.log('extension');
//      reply.continue();
//    });
//
//    next();
//  },
//  register
//}, (err) => {
//  if (err) {
//    console.error('Failed to load plugin:', err);
//  }
//});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
