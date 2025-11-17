exports.up = function (knex) {
    return knex.schema.createTable('subscribers', (table) => {
      table.increments('id').primary();
      table.string('email', 255).unique().notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('subscribers');
  };