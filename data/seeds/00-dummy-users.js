
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user01', phone: 9998675309, password: 'password'},
        {id: 2, username: 'user02', phone: 9999999999, password: 'password'},
        {id: 3, username: 'user03', phone: 9995551212, password: 'password'}
      ]);
    });
};
