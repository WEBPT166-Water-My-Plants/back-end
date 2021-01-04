
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {id: 1, nickname: 'King', species: 'plant', h2oFrequency: 'every other day', plantId: 3},
        {id: 2, nickname: 'Queen', species: 'not meat', h2oFrequency: 'once per day', plantId: 2},
        {id: 3, nickname: 'Prince', species: 'also not meat', h2oFrequency: 'daily', plantId: 1}
      ]);
    });
};
