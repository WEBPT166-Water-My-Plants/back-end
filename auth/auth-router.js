const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('./users/users-model');
const generateToken = require('./token');

router.post('/register', async (req, res) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password);
	user.password = hash;

	try {
		const saved = await Users.add(user);
		res.status(201).json(saved);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await Users.findBy({ username }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({
				message: `Welcome ${user.username}!`,
				token,
			});
		} else {
			res.status(401).json({
				message: 'Invalid credentials',
			});
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;