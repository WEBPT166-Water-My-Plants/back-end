const table = require('../dbConfig');

exports.up = function (knex) {
	return knex.schema.createTable('plants', (tbl) => {
		tbl.increments('plantId');
		tbl.string('nickname').unique();
		tbl.string('species').notNullable().unique();
		tbl.string('h2oFrequency').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants');
};
