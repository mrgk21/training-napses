'use strict';
import "dotenv/config";

import Sequelize from "sequelize";
import { dbInstance } from "../instance.js";
import UserModel from './User.js';

const db = {};

db[UserModel.name] = UserModel;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = dbInstance;
db.Sequelize = Sequelize;

export default db;
