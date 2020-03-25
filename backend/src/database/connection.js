const Knex = require("knex");
const Configuration = require("../../knexfile");

const connection = Knex(Configuration.development);

module.exports = connection;
