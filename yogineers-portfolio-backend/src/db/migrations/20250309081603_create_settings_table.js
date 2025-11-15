exports.up = function (knex) {
    return knex.schema.createTable('settings', (table) => {
      table.increments('id').primary();
      table.string('site_name', 255).notNullable();
      table.string('site_logo', 500);
      table.string('contact_email', 255);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('settings');
  };