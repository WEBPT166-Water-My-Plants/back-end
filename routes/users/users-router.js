const router = require('express').Router();
const protect = require('../../api/middleware/restricted-middleware');

const Users = require('./users-model');

router.get('/', protect, (req, res) => {
	Users.find((users) => {
		res.status(200).json(users);
	}).catch((err) => res.send(err));
});

module.exports = router;
