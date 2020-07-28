'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var body_parser_1 = __importDefault(require('body-parser'));
var fs_1 = __importDefault(require('fs'));
var user_model_1 = require('./model/user.model');
var user = new user_model_1.User(1, 'Test User');
var app = express_1.default();
// const readStream = fs.createReadStream(`${__dirname}/package.json`); // /home/magluf/repos/work/node-ts/package.json
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send('Hello, ' + user.name);
  var readStream = fs_1.default.createReadStream('package.json'); // /home/magluf/repos/work/node-ts/package.json
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('server is running on PORT ' + PORT);
});
