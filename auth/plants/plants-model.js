const db = require('../../data/dbConfig');

module.exports = {
	find,
	findById,
	add,
	update,
	remove,
};

function find(id) {
	return db('plants').where({ plantId: id });
}

function findById(id) {
	return db('plants').where({ id }).first();
}

function add(newPlant) {
	return db('plants').insert(newPlant);
}

function update(id, changes) {
	return db('plants').where({ id }).update(changes);
}

function remove(id) {
	return db('plants').delete().where({ id });
}
