const express = require('express');
const url = require('url');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

app.get('/', (request, response) =>
  response.send('Incrível api de Roberto Mandolesi Vilas Boas e Camilo Raitz da Silva')
);

// all routes prefixed with /api
app.use('/api', router);

router.get('/', (request, response) => {
  response.json({
    message: 'Incrível api de Roberto Mandolesi Vilas Boas e Camilo Raitz da Silva',
    hacking: 'no',
    param: null
  });
});

router.get('/hack', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;

  response.json({
    message: 'Incrível api de Roberto Mandolesi Vilas Boas e Camilo Raitz da Silva',
    hacking: 'yes',
    param: myParam
  });
});

// this array is used for identification of allowed origins in CORS
const originWhitelist = [];
// const originWhitelist = ['http://localhost:3000', 'https://example.net'];

// middleware route that all requests pass through
router.use((request, response, next) => {
  console.log('Server info: Request received');

  let origin = request.headers.origin;

  // only allow requests from origins that we trust
  if (originWhitelist.length === 0 || originWhitelist.indexOf(origin) > -1) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }

  // only allow get requests, separate methods by comma e.g. 'GET, POST'
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);

  // push through to the proper route
  next();
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
