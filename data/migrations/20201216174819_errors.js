exports.up = function (knex) {
	return knex.schema.createTable('errors', (tbl) => {
		tbl.increments();
		tbl.dateTime('errorDate').notNullable();
		tbl.string('error').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('errors');
};
