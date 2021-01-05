const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets');

module.exports = (req, res, next) => {
	const [authType, token] = req.headers.authorization.split(' ');
	console.log('token: ', token);

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({
					message: 'Invalid token',
				});
			} else {
				req.decodedJWT = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({
			message: 'You must log in to view this content',
		});
	}
};
