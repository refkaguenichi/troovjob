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
          to: "jobs.companyId",
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
      required: ["onwnerId", "email", "name"],

      properties: {
        id: { type: "string", format: "cid", readOnly: true },
        ownerId: { type: ["string", "null"] },
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
            zipCode: { type: "string" },
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
