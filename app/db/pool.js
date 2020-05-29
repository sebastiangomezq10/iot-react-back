const { Pool } = require('pg');

const env = require("../../env");

const pool = new Pool(env.conectDB.pgSettings);

module.exports = { pool };