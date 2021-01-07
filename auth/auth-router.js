const router = require('express').Router();
const Users = require('./users/users-model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets');
const { isValid } = require('../api/validateUser-middleware');

/*--- POST /api/auth/register ---*/
router.post('/register', (req, res) => {
	let creds = req.body;

	if (isValid(creds)) {
		// const rounds = process.env.HASH_ROUNDS || 8;
		const hash = bcrypt.hashSync(creds.password, 8);
		creds.password = hash;

		Users.add(creds)
			.then((user) => {
				res.status(201).json({ data: user });
			})
			.catch((err) => {
				res.status(500).json({
					message: err.message,
				});
			});
	} else {
		res.status(400).json({
			message:
				'You must provide a username, password and valid phone to register',
		});
	}
});

/*--- POST /api/auth/login ---*/
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (isValid(req.body)) {
		Users.findBy({ username: username })
			.then(([user]) => {
				const { id } = user.id;

				if (user && bcrypt.compareSync(password, user.password)) {
					const { id } = user.id;
					const token = generateToken(user);
					res.status(200).json({
						message: `Welcome ${username}!`,
						token,
						id: user.id,
					});
				} else {
					res.status(401).json({
						message: 'Invalid credentials',
					});
				}
			})
			.catch((err) => {
				console.log(err)
				res.status(500).json({
					message: 'Something went wrong',
				});
			});
	} else {
		res.status(400).json({
			message: 'You must provide a valid username and password to log in',
		});
	}
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username
	}

	const options = {
		expiresIn: '1d'
	}
	return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;