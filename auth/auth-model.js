const jwt = require('jsonwebtoken');
const db = require('../data/dbConfig');

async function findByUsername(username) {
	const user = await db('users').where({ username }).first();
	if (user) return { ...user, token: generateToken(user) };
	else return null;
}

async function registerUser(user) {
	try {
		const user = await db('users').insert(user);
		return findByUsername(user.username);
	} catch (err) {
		return err;
	}
}

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		password: user.password,
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = {
	generateToken,
	findByUsername,
	registerUser,
};
