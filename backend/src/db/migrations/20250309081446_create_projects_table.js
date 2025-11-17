exports.up = function (knex) {
    return knex.schema.createTable('projects', (table) => {
      table.increments('project_id').primary();
      table.integer('service_id').unsigned().notNullable();
      table.string('project_name', 255).notNullable();
      table.string('project_video', 500);
      table.text('project_photos');
      table.string('project_thumbnail', 500);
      table.text('project_description').notNullable();
      table.timestamps(true, true);
  
      // Foreign key constraint
      table.foreign('service_id').references('service_id').inTable('services').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('projects');
  };