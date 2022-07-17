const { Model, snakeCaseMappers } = require("objection");

class Resume extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "seekersresumes";
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
      required: ["jobSeekerId"],

      properties: {
        id: { type: "string", format: "rsid", readOnly: true },
        jobSeekerId: { type: ["string", "null"] },
        title: { type: "string", minLength: 1, maxLength: 255 },
        extension: { type: "string", minLength: 1, maxLength: 255 },
        url: { type: "string", minLength: 1, maxLength: 255 },
        academicDetails: { type: "string", minLength: 1, maxLength: 255 },
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
module.exports = Resume;
