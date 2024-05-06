import "dotenv/config";
import { Sequelize } from "sequelize";
import config from "./config/config.js";

const _config = config[process.env.NODE_ENV ?? "development"];

const connection = new Sequelize(_config);
export { connection };
