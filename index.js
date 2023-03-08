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

class Entity extends Sequelize.Model {}
Entity.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    prop: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "entity" }
);
await sequelize.sync();

// BUG: will execute a select query that incorrectly prefixes
// the aliased table name in the where clause with the schema.
await Entity.findOne({ where: { prop: "hello, world" } }); 
