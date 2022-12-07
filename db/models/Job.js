const { Model, snakeCaseMappers } = require("objection");

class Job extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "jobs";
  }
  static get idColumn() {
    return "id";
  }
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  static get relationMappings() {
    const Company = require("./Company");
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: "companies.id",
          to: "jobs.company_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "location", "expire_at"],
      properties: {
        id: { type: "integer" },
        company_id: { type: ["integer", "null"] },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 1, maxLength: 255 },
        location: { type: "string", minLength: 1, maxLength: 255 },
        category: {
          type: "string",
          enum: ["full_time", "part-time", "freelancer"],
          default: "full_time",
        },
        salary: Number,
        expires_at: Date,
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
module.exports = Job;
