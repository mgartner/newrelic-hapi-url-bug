'use strict';

const NewRelic = require('newrelic');

const Bluebird = require('bluebird');
const Hapi     = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.ext('onPostAuth', (request, reply) => {
  NewRelic.setTransactionName(`${request.route.method.toUpperCase()}/${request.route.path}`);
  Bluebird.resolve()
  .then(() => {
    reply.continue();
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
