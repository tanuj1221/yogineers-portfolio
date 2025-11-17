exports.up = function (knex) {
    return knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('subject', 255);
      table.text('message').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('contacts');
  };