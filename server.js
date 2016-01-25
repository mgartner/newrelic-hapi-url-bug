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
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply('Hello, world!');
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
