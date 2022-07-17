const { Model, snakeCaseMappers } = require("objection");

class Role extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "roles";
  }
  static get idColumn() {
    return "id";
  }
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["onwnerId", "role"],

      properties: {
        id: { type: "string", format: "rid", readOnly: true },
        ownerId: { type: ["string", "null"] },
        role: {
          type: "string",
          enum: ["user", "jobSeeker", "company", "admin"],
          default: "user",
        },
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
      },
    };
  }
  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  $beforeDelete() {
    this.deleted_at = new Date();
  }
}
module.exports = Role;
