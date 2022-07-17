const { Model, snakeCaseMappers } = require("objection");

class JobSeeker extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "jobseekers";
  }
  static get idColumn() {
    return "id";
  }

  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  fullName() {
    return this.firstname + " " + this.lastname;
  }

  address() {
    return (
      this.address.street +
      " , " +
      this.address.city +
      " , " +
      this.address.zipCode +
      " , " +
      this.address.country
    );
  }
  contactInfo() {
    return {
      Email: this.email,
      Phone: this.phone,
      address: this.address(),
    };
  }

  static get relationMappings() {
    const Job = require("./Job");
    return {
      job: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: "jobseekers.id",
          through: {
            from: "applications.jobSeekerId",
            to: "applications.jobId",
          },
          to: "jobs.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["onwnerId", "email", "firstname", "lastname"],

      properties: {
        id: { type: "string", format: "jsid", readOnly: true },
        ownerId: { type: ["string", "null"] },
        email: { type: "string", minLength: 1, maxLength: 255 },
        firstname: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
        title: { type: "string", minLength: 1, maxLength: 255 },
        summary: { type: "string", minLength: 1, maxLength: 255 },
        phone: { type: "number" },
        avatar: { type: "string", minLength: 1, maxLength: 255 },
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
module.exports = JobSeeker;
