exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password_hash', 255).notNullable();
      table.enum('role', ['admin', 'client']).defaultTo('admin');
      table.timestamps(true, true); // Adds `created_at` and `updated_at`
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };