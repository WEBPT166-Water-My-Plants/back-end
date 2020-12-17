
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', phone: '9998675309', password: '', email: 'email@email.com'},
        {id: 2, username: 'user2', phone: '9995551212', password: '', email: 'email@email.com'},
        {id: 3, username: 'user3', phone: '9995551313', password: '', email: 'email@email.com'}
      ]);
    });
};
