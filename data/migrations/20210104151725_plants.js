const table = require('../dbConfig');

exports.up = function (knex) {
	return knex.schema.createTable('plants', (tbl) => {
		tbl.increments()
		tbl.integer('userId')
			.notNullable()
			.references('id')
			.inTable('users');
		tbl.string('nickname').notNullable();
		tbl.string('species').notNullable();
		tbl.string('h2oFrequency').notNullable();
		tbl.date('lastWatered');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants');
};
