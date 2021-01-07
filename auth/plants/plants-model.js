const db = require('../../data/dbConfig');
const { findPlants } = require('../users/users-model');

module.exports = {
	find,
	findById,
	add,
	update,
	remove,
};

function find(id) {
	return db('plants').where({ userId: id });
}

function findById(id) {
	return db('plants').where({ id }).first();
}

async function add(newPlant) {
	try {
		const [id] = await db('plants').insert(newPlant);
		return findPlants(id);
	} catch (err) {
		throw err;
	}
}

function update(id, changes) {
	return db('plants').where({ id }).update(changes);
}

function remove(id) {
	return db('plants').delete().where({ id });
}
