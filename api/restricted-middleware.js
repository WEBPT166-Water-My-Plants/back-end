const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const { token } = req.headers;
	console.log('token: ', token);

	if (!token) {
		res.status(403).json({
			message: 'Missing authorization header',
		});
	} else {
		const split = token.split(' ')[1];
		jwt.verify(split, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({
					message: 'Invalid token',
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
};
