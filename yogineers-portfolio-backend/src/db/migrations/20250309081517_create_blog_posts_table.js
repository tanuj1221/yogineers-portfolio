//portfolio-backend-app\src\db\migrations\20250309081517_create_blog_posts_table.js
exports.up = function (knex) {
    return knex.schema.createTable('blog_posts', (table) => {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.string('slug', 255).unique().notNullable();
      table.text('content').notNullable();
      table.integer('author_id').unsigned();
      table.string('featured_image', 500);
      table.timestamps(true, true);
  
      // Foreign key constraint
      table.foreign('author_id').references('id').inTable('users').onDelete('SET NULL');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('blog_posts');
  };