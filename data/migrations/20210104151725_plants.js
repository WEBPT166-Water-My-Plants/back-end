const table = require('../dbConfig');

exports.up = function (knex) {
	return knex.schema.createTable('plants', (tbl) => {
		tbl.increments();
		tbl.integer('userId')
			.notNullable()
			.unique()
			.references('id')
			.inTable('users');
		tbl.string('nickname').unique();
		tbl.string('species').notNullable();
		tbl.string('h2oFrequency').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants');
};
