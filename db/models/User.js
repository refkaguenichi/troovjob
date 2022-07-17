const { Model, snakeCaseMappers } = require("objection");

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "users";
  }
  static get idColumn() {
    return "id";
  }
  // In most projects, the naming convention of the database columns does not match the casing we use in our code. Objection.js offers a mapper functionality which maps the column names to snake case. For example full_name will be fullName throughout our code.
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }


  static get relationMappings() {
    const JobSeeker = require("./JobSeeker");
    const Company = require("./Company");
    const Role = require("./Role");
    return {
      jobSeeker: {
        relation: Model.BelongsToOneRelation,
        modelClass: JobSeeker,
        join: {
          from: "users.id",
          to: "jobSeekers.ownerId",
        },
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: "users.id",
          to: "companyies.ownerId",
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: "users.id",
          to: "roles.ownerId",
        },
      },
    };
  }


  static async getJobSeeker(id) {
    // Or maybe getUserWithJobSeekerProfile
    // const myUser = await User.getUser(id) //when call api
    return await this.query().withGraphFetched(`${role}`).findById(id);
  }
  // static async getUser(id) {
  //   return await this.query().withGraphFetched("company").findById(id);
  // }

  static async getUserWithRole(id) {
    let user = await this.query().withGraphFetched("role").findById(id);
    return user.role;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password"],

      properties: {
        id: { type: "string", format: "uid", readOnly: true },
        username: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
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
module.exports = User