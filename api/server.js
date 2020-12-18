const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('../auth/auth-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', auth)
server.get('/', (req, res) =>
	res.json({
		server: 'running',
	})
);

server.use(errorHandler);

module.exports = server;

function errorHandler(err, req, res, next) {
	res.status(err.code).json({
		message: err.message,
	});
}
