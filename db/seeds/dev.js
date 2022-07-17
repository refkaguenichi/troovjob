/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // truncate all existing tables
  // await knex.raw('TRUNCATE TABLE "users" CASCADE');
  // Deletes ALL existing entries
  await knex("profiles").del();
  await knex("profiles").insert([
    { id: 1, occupation: "engineer", avatar: "avatar" },
    { id: 2, occupation: "doctor", avatar: "avatar" },
    { id: 3, occupation: "lawyer", avatar: "avatar" },
  ]);
  await knex("users").del();
  await knex("users").insert([
    { id: 1, firstname: "user1", lastname: "user", profileId: 1 },
    { id: 2, firstname: "user2", lastname: "user", profileId: 3 },
    { id: 3, firstname: "user3", lastname: "user", profileId: 2 },
  ]);
};
