const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(403).json({
			message: 'Missing authorization headers',
		});
	} else {
		const split = authorization.split(' ')[1];
		jwt.verify(split, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({
					message: 'Invalid authorization token',
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
};
