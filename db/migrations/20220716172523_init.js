exports.up = function(knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('user_name');
        table.string('password');
        table.timestamps(true, true);
      })
      .createTable('roles', (table) => {
        table.increments('id');
        table
          .integer('owner_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table
          .enum('role', ['user', 'job_seeker', 'company', 'admin'])
          .notNullable();
        table.timestamps(true, true);
      })
      .createTable('job_seekers', (table) => {
        table.increments('id');
        table
          .integer('owner_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.string('email').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('title');
        table.string('summary');
        table.integer('phone');
        table.string('avatar');
        table.jsonb('links');
        table.jsonb('address');
        table.timestamps(true, true);
      })
      .createTable('companies', (table) => {
        table.increments('id');
        table
          .integer('owner_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.string('email').notNullable();
        table.string('name').notNullable();
        table.string('description');
        table.integer('phone');
        table.string('logo');
        table.jsonb('address');
        table.timestamps(true, true);
      })
      .createTable('jobs', (table) => {
        table.increments('id');
        table
          .integer('company_id')
          .references('id')
          .inTable('companies')
          .onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('location').notNullable();
        table
          .enum('category', ['full-time', 'part-time', 'freelancer'])
          .notNullable();
        table.double('salary');
        table.date('expires_at');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('roles')
    .dropTable('job_seekers')
    .dropTable('jobs')
    .dropTable('companies')
    .dropTable('users');
};
