const db = require('../data/dbConfig');

module.exports = function (param, reqObj, table, column) {
	return async function (req, res, next) {
		const id = req.params[param];
		try {
			const obj = await db(table)
				.where({ [column]: id })
				.first();
			if (!obj) {
				res.status(404).json({
					message: `Invalid ${table} ${column}`,
				});
			} else {
				req[reqObj] = obj;
				next();
			}
		} catch (err) {
			next(err);
		}
	};
};
