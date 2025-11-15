exports.up = function (knex) {
    return knex.raw(`
      ALTER TABLE services
      DROP COLUMN service_link,
      ADD COLUMN service_link VARCHAR(700) NOT NULL AFTER service_icon;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      ALTER TABLE services
      DROP COLUMN service_link,
      ADD COLUMN service_link VARCHAR(700) NOT NULL;
    `);
  };