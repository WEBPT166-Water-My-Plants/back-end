const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('./secrets');
const router = require('express').Router();

const Users = require('./users/users-model');
const Plants = require('./plants/plants-model');

/* ----- Attempting validation middleware ----- */
module.exports = {
	validUser,
	validLogin,
};

function validLogin(creds) {
	return Boolean(
		creds.username && creds.password && typeof creds.password === 'string'
	);
}

function validUser(user) {
	return Boolean(user.username && user.password);
}

/* ----- POST /api/auth/register ----- */
router.post('/register', (req, res) => {
	const newUser = req.body;

	if (newUser) {
		Users.findBy({ username: newUser.username })
			.first()
			.then((found) => {
				if (found) {
					res.status(400).json({
						message: 'Username already exists',
					});
					return;
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: err.message,
				});
				return;
			});

		const rounds = process.env.HASH_ROUNDS || 8;
		const hash = bcrypt.hashSync(newUser.password, rounds);
		newUser.password = hash;

		Users.add(newUser)
			.then((id) => {
				Users.findById(id)
					.then((user) => {
						user.favoritePlants = []
						res.status(201).json(user)
					})
			})
	}
});

module.exports = router;