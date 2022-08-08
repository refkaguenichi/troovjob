const { Model, snakeCaseMappers } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }
  // static get idColumn() {
  //   return 'id';
  // }
  // In most projects, the naming convention of the database columns does not match the casing we use in our code. Objection.js offers a mapper functionality which maps the column names to snake case. For example full_name will be fullName throughout our code.
  static get columnNameMappers() {
    return snakeCaseMappers({ upperCase: true });
  }

  static get relationMappings() {
    const JobSeeker = require('./JobSeeker');
    const Company = require('./Company');
    const Role = require('./Role');
    return {
      jobseeker: {
        relation: Model.BelongsToOneRelation,
        modelClass: JobSeeker,
        join: {
          from: 'users.id',
          to: 'job_seekers.owner_id',
        },
      },
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: Company,
        join: {
          from: 'users.id',
          to: 'companies.owner_id',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.id',
          to: 'roles.owner_id',
        },
      },
    };
  }


  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        user_name: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
  // $beforeInsert() {
  //   this.created_at = new Date();
  //   this.updated_at = new Date();
  // }

  // $beforeUpdate() {
  //   this.updated_at = new Date();
  // }

  // $beforeDelete() {
  //   this.deleted_at = new Date();
  // }
}
module.exports = User