import { Sequelize } from "sequelize";

const dbName = "CarPlateDB";
const dbUser = "root";
const dbHost = "localhost";
const dbPassword = "aluno123";

const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
});

export default db;