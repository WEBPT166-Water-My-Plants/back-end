const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../api/restricted-middleware');
const authRouter = require('../auth/auth-router');
const userRouter = require('../auth/users/user-router');
const plantRouter = require('../auth/plants/plants-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users/:id', authenticate, userRouter);
server.use('/api/users/:id/plants', authenticate, plantRouter);

server.get('/', (req, res) => {
	res.status(200).json({
		api: 'running',
	});
});

module.exports = server;
