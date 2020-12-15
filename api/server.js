const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./server-model');
const testRouter = require('./testRoute')

// const error = require('../api/middleware/error-middleware')

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/', testRouter);
// server.use('/api/auth/signup');
// server.use('/api/auth/login');
// server.use('/api/users');
// server.use('/api/users/:id');
// server.use('api/users/:id/plants');

// server.use(error);

server.get('/', (req, res) => {
	res.send('<h1>Welcome!</h1>');
});

module.exports = server;
