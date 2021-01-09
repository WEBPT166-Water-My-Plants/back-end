const db = require('../../data/dbConfig');
const { findById } = require('../plants/plants-model');

module.exports = {
	add,
	update,
	remove,
	find,
	findBy,
	getPlants,
	addPlant,
};

function find() {
	return db('users').select('id', 'username').orderBy('id');
}

function getPlants(pId) {
	return db('plants').where({ userId: pId });
}

function findBy(filter) {
	return db('users').where(filter).orderBy('id');
}

async function addPlant(plantData) {
	try {
		const [id] = await db('plants').insert(plantData);
		return getPlants(id);
	} catch (err) {
		throw err;
	}
}

async function add(user) {
	try {
		const [id] = await db('users').insert(user, 'id');
		return findById(id);
	} catch (err) {
		throw err;
	}
}

function update(changes, id) {
	return db('users').where({ id }).update(changes);
}

function remove(id) {
	return db('users').delete().where({ id });
}
