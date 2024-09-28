import { Sequelize } from "sequelize";
import { config } from "../config"

export const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: "postgres",
        port: Number(config.db.port),
    }
);

async function generateDb() {
    await sequelize.sync({ force: true });
    console.log("Base de datos y tablas creadas");
}

generateDb();