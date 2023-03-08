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

await Entity.findOne({ where: { prop: "hello, world" } });
