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

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "companyId",
        "title",
        "description",
        "location",
        "expireDate",
      ],

      properties: {
        id: { type: "string", format: "jid", readOnly: true },
        companyId: { type: ["string", "null"] },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 1, maxLength: 255 },
        location: { type: "string", minLength: 1, maxLength: 255 },
        category: {
          type: "string",
          enum: ["fullTime", "partTime", "freelancer"],
          default: "fullTime",
        },
        salary:Number,
        expireDate: Date,
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
