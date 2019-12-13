import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/config';

dotenv.config({ path: `${__dirname}/../../.env` });

const db = {};
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const basename = path.basename(__filename);

const sequelize = new Sequelize(config.url, config);

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0)
      && (file !== basename)
      && (file.slice(-9) === '.model.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
