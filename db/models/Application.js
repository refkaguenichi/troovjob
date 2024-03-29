const { Model, snakeCaseMappers } = require("objection");

class Application extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "applications";
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

      properties: {
        id: { type: "string", format: "apid", readOnly: true },
        job_seeker_id: { type: ["string", "null"], required: true },
        job_id: { type: ["string", "null"], required: true },
        requirements: {
          type: "object",
          properties: {
            first_name: { type: "string", required: true },
            last_name: { type: "string", required: true },
            email: { type: "string", required: true },
            resume: { type: ["object", "null"], required: true },
            experience: { type: "string", required: true },
            salary: Number,
            sponsorship: Boolean,
            start: Date,
          },
        },
        apply: Boolean,
        save: Boolean,
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
module.exports = Application;
