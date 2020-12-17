const { json } = require('express');
const db = require('../../data/db-config');

module.exports = async function (err, req, res, next) {
	if (err) {
		try {
			await db('errors').insert({
				errorDate: new Date(Date.now()).toISOString(),
				error: err.message,
			});
		} catch (err) {
			console.log(err);
		}
		res.status(500).json({
			message: 'A server error has occured',
		});
	}
};
