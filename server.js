'use strict';

require('newrelic');

const Bluebird = require('bluebird');
const Hapi     = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.ext('onPostAuth', (request, reply) => {
  Bluebird.resolve()
  .then(() => {
    // Use setTimeout to simulate asynchronous I/O call.
    setTimeout(() => {
      reply.continue();
    }, Math.random() * 500);
  });
});

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: (request, reply) => {
    reply('Hello, ' + request.params.name);
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
