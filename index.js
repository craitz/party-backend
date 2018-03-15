const express = require('express');
const url = require('url');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World Dev'));

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({ message: 'Hello, welcome to my server' });
});

router.get('/stuff', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;

  var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;

  response.json({ message: myResponse });
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

// this array is used for identification of allowed origins in CORS
const originWhitelist = ['http://localhost:3000', 'https://example.net'];

// middleware route that all requests pass through
router.use((request, response, next) => {
  console.log('Server info: Request received');

  let origin = request.headers.origin;

  // only allow requests from origins that we trust
  if (originWhitelist.indexOf(origin) > -1) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }

  // only allow get requests, separate methods by comma e.g. 'GET, POST'
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);

  // push through to the proper route
  next();
});
