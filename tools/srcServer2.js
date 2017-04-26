import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import uriUtil from 'mongodb-uri';
import morgan from 'morgan';
/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
const router = express.Router();

let userRoutes = require('../routes/userRoutes');

app.use('/user', userRoutes);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

mongoose.Promise = global.Promise;

let mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/nxtlvl';
let mongooseUri = uriUtil.formatMongoose(mongodbUri);
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(mongooseUri, options);

const PROD = process.env.NODE_ENV === 'production';

app.use(express.static('src/public'));

if (PROD) {
  app.use('/', express.static('dist'));
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/public/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else if (!PROD) {
    console.log(('Starting app in dev mode, listening on port ' + port).green);
    open(`http://localhost:${port}`);
  } else {
    console.log('Starting app in production mode, listening on port ' + port);
  }
});
