const { table } = require('../dbConfig');

exports.up = function (knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();
		tbl.string('username', 24).notNullable().unique();
		tbl.integer('phone');
		tbl.string('password').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
