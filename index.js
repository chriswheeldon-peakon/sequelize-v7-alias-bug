import "dotenv/config";
import { DataTypes, Sequelize } from "@sequelize/core";

const schema = "dev";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  schema,
});

await sequelize.createSchema(schema);

const Entity = sequelize.define(
  "entity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { tableName: "entity", timestamps: false, paranoid: false }
);

const Relation = sequelize.define(
  "relation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { tableName: "relation", timestamps: false, paranoid: false }
);

Entity.hasMany(Relation);

await sequelize.sync();

// BUG: will execute a select query that incorrectly prefixes
// the aliased table name in the on clause with the schema.
await Relation.findAll({ include: [Entity] });

await sequelize.close();
