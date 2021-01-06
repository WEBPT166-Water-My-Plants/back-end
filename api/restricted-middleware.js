const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json({
					message: 'You must be logged in to do that',
				});
			} else {
				req.decodedJwt = decoded;
				next();
			}
		});
	} else {
		res.status(401).json({
			message: 'Access denied',
		});
	}
};
