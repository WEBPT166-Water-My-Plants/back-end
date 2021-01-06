const db = require('../data/dbConfig')

async function getUser(id) {
    return await db('users')
        .where({ id })
        .select('id')
        .first()
}

async function getPlants() {
    return await db('plants')
        .orderBy('plantId')
}

module.exports = {
    getUser,
    getPlants
}