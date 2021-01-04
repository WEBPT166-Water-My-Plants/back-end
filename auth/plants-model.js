const db = require('../data/dbConfig');

module.exports = {
	add,
	findPlants,
	findPlantById,
	updatePlants,
	removePlant,
};

async function findPlants(id) {
	try {
		const plants = await db('plants AS p')
			.join('users AS u', 'u.id', 'p.plantId')
			.where({ plantId: id })
			.select('p.id', 'u.username')
			.orderBy('id');

		return plants;
	} catch (err) {
		throw err;
	}
}

function findPlantById(id) {
	return db('plants').where({ id }).first();
}

async function add(plant) {
	const [id] = await db('plants').insert(plant, 'plantId');
	return findPlantById(id);
}

async function updatePlants(id, changes) {
	try {
		await db('plants').where({ id }).update(changes);
		return await findPlantById(id);
	} catch (err) {
		throw err;
	}
}

async function removePlant(id) {
	try {
		return await db('plants').del().where({ id });
	} catch (err) {
		throw err;
	}
}
