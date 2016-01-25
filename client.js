var http = require('http');

var options = {
  host: 'localhost',
  port: 3000,
  path: '/hello'
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
http.request(options, callback).end();
