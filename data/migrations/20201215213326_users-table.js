exports.up = function (knex) {
	return knex.schema
		.createTable('users', (tbl) => {
			tbl.increments();
			tbl.string('username', 25).unique().notNullable();
			tbl.integer('phone').notNullable();
			tbl.string('password').notNullable();
			tbl.string('email')
		})
		.createTable('plants', (tbl) => {
			tbl.increments();
			tbl.string('plant_name').unique().notNullable();
			tbl.string('plant_type').notNullable();
			tbl
                .integer('plant_id')
                .unique()
				.notNullable()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.boolean('watered');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
