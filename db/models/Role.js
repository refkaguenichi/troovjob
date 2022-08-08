const { Model, snakeCaseMappers } = require("objection");

class Role extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "roles";
  }
  // static get idColumn() {
  //   return "id";
  // }
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  static get jsonSchema() {
    return {
      type: "object",
      // required: ["role"],

      properties: {
        id: { type: "integer" },
        owner_id: { type: "integer" },
        role: {
          type: "string",
          enum: ["user", "job_seeker", "company", "admin"],
          default: "user",
        },
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
      },
    };
  }
  // $beforeInsert() {
  //   this.created_at = new Date();
  //   this.updated_at = new Date();
  // }

  // $beforeUpdate() {
  //   this.updated_at = new Date();
  // }

  // $beforeDelete() {
  //   this.deleted_at = new Date();
  // }
}
module.exports = Role;
