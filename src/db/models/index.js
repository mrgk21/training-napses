'use strict';
import "dotenv/config";

import Sequelize from "sequelize";
import { dbInstance } from "../instance.js";

import AadharCardModel from "./AadharCard.js";
import AddressModel from "./Address.js";
import UserModel from './User.js';

const db = {};

db[AadharCardModel.name] = AadharCardModel;
db[UserModel.name] = UserModel;
db[AddressModel.name] = AddressModel;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = dbInstance;
db.Sequelize = Sequelize;

export default db;
