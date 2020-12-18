const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secrets = require('./secrets');
const Users = require('./users-model');

router.get('/users', validateJWT, (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: 'There was a problem retrieving users',
			});
		});
});

router.post('/register', (req, res, next) => {
	const { username, password } = req.body;
	const rounds = process.env.HASH_ROUNDS || 8;
	const hash = bcrypt.hashSync(password, rounds);

	Users.add({ username, password: hash })
		.then((user) => {
			const token = generateToken(user);
			res.status(201).json({ token });
		})
		.catch((err) => {
			console.error(err);
			next({
				code: 500,
				error: 'Unable to create new user',
			});
		});
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;

	Users.findBy({ username: username })
		.then(([user]) => {
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({ message: 'Hello World', token });
		} else {
			next({
				code: 401,
				message: 'Invalid password',
			}).catch((err) => {
				console.error(err);
				next({
					code: 500,
					message: 'There was a problem logging in',
				});
			});
			// res.status(401).json({
			// 	message: 'Invalid credentials'
			// })
		}
	})
	.catch(err => {
		res.status(400).json({
			message: 'NO',
			err
		})
	})
});

module.exports = router;

function generateToken(user) {
	const payload = {
		userId: user.id,
		username: user.username,
	};
	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
}

function validateJWT(req, res, next) {
	console.log(req.headers);
	try {
		const token = req.headers.authorization.split(' ')[1];
		req.user = jwt.verify(token, secrets.jwtSecret);
		console.log(req.user);
		next();
	} catch (err) {
		console.log(err);
		next({
			code: 401,
			message: 'Invalid token',
		});
	}
}
