import { Sequelize } from "sequelize";

import { config } from "./config/config.js";
const env = process.env.NODE_ENV || 'development';
const _config = config[env];

const dbInstance = new Sequelize(_config);
export { dbInstance };

