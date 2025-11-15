// portfolio-backend-app\src\db\migrations\20250309081418_create_services_table.js
exports.up = function (knex) {
  return knex.schema.createTable('services', (table) => {
    table.increments('service_id').primary();
    table.string('service_gif', 500).notNullable();
    table.string('service_name', 255).notNullable();
    table.text('service_description').notNullable();
    table.string('service_icon', 500).notNullable();
    table.string('service_link', 700).notNullable(); 
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('services');
};
