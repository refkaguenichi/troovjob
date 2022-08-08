const { Model, snakeCaseMappers } = require("objection");

class Company extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "companies";
  }
  static get idColumn() {
    return "id";
  }
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  static get relationMappings() {
    const Job = require("./Job");
    return {
      job: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: "companies.id",
          to: "jobs.company_id",
        },
      },
    };
  }

  static async getCompanyWithJobs(id) {
    return await this.query().withGraphFetched("jobs").findById(id);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name"],

      properties: {
        id: { type: "integer" },
        owner_id: { type: ["integer", "null"] },
        email: { type: "string", minLength: 1, maxLength: 255 },
        name: { type: "string", minLength: 1, maxLength: 255 },
        phone: { type: "number" },
        description: { type: "string", minLength: 1, maxLength: 255 },
        logo: { type: "string", minLength: 1, maxLength: 255 },
        links: { type: "array" },
        address: {
          type: "object",
          required: ["country"],
          properties: {
            country: { type: "string" },
            city: { type: "string" },
            street: { type: "string" },
            zip_code: { type: "string" },
          },
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
module.exports = Company;
