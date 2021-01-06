const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('../data/dbConfig')

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// server.use('/api', ApiRouter);

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
