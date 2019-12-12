require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: 0,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};
