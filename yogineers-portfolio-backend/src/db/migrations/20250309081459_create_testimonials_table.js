exports.up = function (knex) {
    return knex.schema.createTable('testimonials', (table) => {
      table.increments('id').primary();
      table.string('client_name', 255).notNullable();
      table.string('designation', 255);
      table.text('feedback').notNullable();
      table.integer('rating').unsigned().checkBetween([1, 5]);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('testimonials');
  };