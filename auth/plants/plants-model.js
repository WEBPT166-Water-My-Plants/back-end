const db = require('../../data/dbConfig');
const { findPlants } = require('../users/users-model');

module.exports = {
	getPlants,
	findById,
	add,
	editPlant,
	remove,
};

async function getPlants(id) {
	console.log(id, 'Inside plants.getPlants')
	let plants = await db('plants as p')
		.join('users as u', 'u.id', 'p.userId')
		.where({ 'p.userId': id })
		.select('u.id as uId', 'p.id as pId', 'u.username as username', 'p.nickname as nickname', 'p.h2oFrequency as water');

	return plants;
}

function findById(id) {
	return db('plants').where({ id }).first();
}

async function add(newPlant) {
	try {
		const [userId] = await db('plants').insert(newPlant);
		return getPlants(userId);
	} catch (err) {
		throw err;
	}
}

async function editPlant(plant, id, userId) {
	const count = await db('plants').update(plant).where({ id });

	return await getPlants(userId);
}

function remove(id) {
	return db('plants').delete().where({ id });
}
