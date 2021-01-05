const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const ApiRouter = require('../api/apiRoutes')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', ApiRouter);

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
