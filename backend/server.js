require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');
const routes = require('./routes');

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});





// LOGIN AND REGISTER (Alfred)
app.post('/registerUser', (req, res) => {
  connection.query(
    'INSERT INTO Users (Username, Password) VALUES (?, ?)',
    [
      req.body.Username,
      req.body.Password
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query')
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      }
      else {
        console.log('check');
        res.status(200).json({ data: rows })
      }
    }
  )
})

app.post('/loginUser', (req, res) => {
  connection.query(
    'SELECT EXISTS(SELECT * FROM Users WHERE Username = ? AND Password = ?), (SELECT UserID AS result FROM Users WHERE Username = ? AND Password = ?) AS result',
    [
      req.body.Username,
      req.body.Password,
      req.body.Username,
      req.body.Password,
    ],
    function (err, rows, fields) {
      if (err) {
        logger.error('Error while executing Query');
        res.status(400).json({
          data: [],
          error: 'MySQL error',
        });
      } else if (!rows[0].result) {
        res.send('false');
      } else {
        res.status(200).send(rows[0].result.toString());
      }
    }
  );
});

