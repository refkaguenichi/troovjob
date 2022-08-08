const { Model, snakeCaseMappers } = require("objection");

class JobSeeker extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "job_seekers";
  }
  static get idColumn() {
    return "id";
  }
  static get virtualAttributes() {
    return ["fullName", "addres"];
  }
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  fullName() {
    return this.first_name + " " + this.last_name;
  }

  address() {
    return (
      this.address.street +
      " , " +
      this.address.city +
      " , " +
      this.address.zip_code +
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
          from: "job_seekers.id",
          through: {
            from: "applications.job_seeker_id",
            to: "applications.job_id",
          },
          to: "jobs.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstname", "lastname"],

      properties: {
        id: { type: "integer" },
        owner_id: { type: ["integer", "null"] },
        email: { type: "string", minLength: 1, maxLength: 255 },
        first_name: { type: "string", minLength: 1, maxLength: 255 },
        last_name: { type: "string", minLength: 1, maxLength: 255 },
        title: { type: "string", minLength: 1, maxLength: 255 },
        summary: { type: "string", minLength: 1, maxLength: 255 },
        phone: { type: "number" },
        avatar: { type: "string", minLength: 1, maxLength: 255 },
        links: {
          type: "array",
          items: {
            type: "string",
          },
        },
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
module.exports = JobSeeker;
