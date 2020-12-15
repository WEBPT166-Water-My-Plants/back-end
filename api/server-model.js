const db = require('../data/db-config');

module.exports = {
	// add,
	find,
	// findById,
	// findPlants
};

function find() {
	return db('users').select('id', 'username').orderBy('id');
}
