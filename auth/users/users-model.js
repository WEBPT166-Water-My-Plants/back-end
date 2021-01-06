const db = require('../../data/dbConfig');

module.exports = {
	addPlant,
	editPlant,
	removePlant,
};

async function getPlants(id) {
	const plant = await db('plants').where({ id }).first();

	return plant;
}

async function addPlant(plant) {
	const id = await db('plants').insert(plant).returning('id');
	return getPlants(plants.plantId);
}

async function editPlant(id, plant) {
	const count = await db('plants').update(plant).where({ id });
	return await getPlants(id);
}

async function removePlant(id) {
	return await db('plants').del().where({ id });
}
