const bcrypt = require('bcryptjs');
const router = require('express').Router();

const db = require('./auth-model');

router.use('/', findUser);

router.post('/auth/register', async (req, res, next) => {
	if (req.user) {
		res.status(400).json({
			message: 'That username is taken',
		});
	} else {
		const user = req.body;
		if (!user.username || !user.password || !user.phone) {
			res.status(400).json({
				message: 'Missing Username or Password',
			});
		} else {
			try {
				const hashed = bcrypt.hashSync(user.password, 8);
				user.password = hashed;
				const { password, ...newUser } = await db.registerUser(user);
				res.status(201).json(newUser);
			} catch (err) {
				next(err);
			}
		}
	}
});

router.post('/auth/login', async (req, res, next) => {
	const { user } = req;
	if (!user) {
		res.status(404).json({
			message: 'Invalid Username',
		});
	} else {
		const { password } = req.body;
		if (password) {
			try {
				if (bcrypt.compareSync(password, req.password)) {
					res.status(200).json(user);
				} else {
					res.status(400).json({
						message: 'Invalid Password',
					});
				}
			} catch (err) {
				next(err);
			}
		} else {
			res.status(400).json({
				message: 'Missing Password',
			});
		}
	}
});

async function findUser(req, res, next) {
	const { username } = req.body;
	if (username) {
		try {
			const result = await db.findByUsername(req.body.username);
			if (!result) next();
			else {
				const { password, ...user } = result;
				req.password = password;
				req.user = user;
				next();
			}
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).json({
			message: 'Missing username',
		});
	}
}

module.exports = router;
