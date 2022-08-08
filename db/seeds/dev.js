/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // truncate all existing tables
  // await knex.raw('TRUNCATE TABLE "users" CASCADE');
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { user_name: "user1", password: "123" },
    { user_name: "user2", password: "123" },
    { user_name: "user3", password: "123" },
    { user_name: "user4", password: "123" },
  ]);
  await knex("roles").del();
  await knex("roles").insert([
    { role: "company" },
    { role: "admin" },
    { role: "job_seeker" },
    { role: "user" },
  ]);
  await knex("job_seekers").del();
  await knex("job_seekers").insert([
    {
      email: "l@gmail.com",
      first_name: "lina",
      last_name: "ben ali",
      address: JSON.stringify({
        country: "Tunisia",
        city: "El Mourouj",
        street: "01",
        zip_code: "2074",
      }),
    },
  ]);
  await knex("companies").del();
  await knex("companies").insert([
    { email:"cmp@gmail.com", name: "cmp" },
  ]);

  await knex("jobs").del();
  await knex("jobs").insert([
    { title: "Fullstack Engineer", description: "description", location:"Tunisia", category: "part-time" },
  ]);
};
