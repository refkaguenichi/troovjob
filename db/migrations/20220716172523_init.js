/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable("profiles", (table) => {
        table.increments("id");
        table.string("occupation").notNullable();
        table.string("avatar").notNullable();
        table.timestamps(true, true);
      })
      .createTable("users", (table) => {
        table.increments("id");
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.integer("profileId").references("id").inTable("profiles");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("profiles").dropTable("users");
};
