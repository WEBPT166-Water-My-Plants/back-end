const db = require('../../data/dbConfig');

module.exports = {
	find,
	findBy,
	findById,
	add,
	update,
	remove,
};

function find() {
	return db('plants')
		.select('id', 'nickname', 'species', 'plantId')
		.orderBy('id');
}

function findBy(filter) {
	return db('plants').where(filter).orderBy('id');
}

async function findById(id) {
	try {
		const plant = await db('plants').where({ id }).first();
		return plant;
	} catch (err) {
		throw err;
	}
}

async function add(plantData, id) {
	try {
		const plant_id = await db('plants AS p')
			.join('users AS u', 'u.id', 'p.plantId')
			.where({ plantId: id })
			.join('users AS u', 'u.username', 'p.plantId')
			.where({ plantId: plant_id })
			.insert(plantData);
		const newPlant = await findById(plant_ids[0]);
		return newPlant;
	} catch (err) {
		throw err;
	}
}

async function update(id, changes) {
	try {
		await db('plants').where({ id }).update(changes);
		return await findById(id);
	} catch (err) {
		throw err;
	}
}

async function remove(id) {
	try {
		return await db('plants').del().where({ id });
	} catch (err) {
		throw err;
	}
}
