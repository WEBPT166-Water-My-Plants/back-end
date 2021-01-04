const db = require('../data/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove,
};

function find() {
	return db('users').select('id', 'username').orderBy('id');
}

function findBy(filter) {
	return db('users').where(filter).orderBy('id');
}

async function add(user) {
	try {
		const [id] = await db('users').insert(user, 'id');
		return findById(id);
	} catch (err) {
		throw err;
	}
}

async function findById(id) {
	try {
		const user = await db('users').where({ id }).first();
		return user;
	} catch (err) {
		throw err;
	}
}

async function update(id, changes) {
	try {
		await db('users').where({ id }).update(changes);
		return await findById(id);
	} catch (err) {
		throw err;
	}
}

async function remove(id) {
	try {
		return await db('users').del().where({ id });
	} catch (err) {
		throw err;
	}
}
