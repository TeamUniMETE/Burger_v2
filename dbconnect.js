const pgp = require('pg-promise')(/*option*/);
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL || 'postgres://gfpvcpkunnnurl:45e54135f7d04e569766a39e9f0905c6bc41b35ef56cb4141c9bdaf2b4a375f7@ec2-46-137-174-67.eu-west-1.compute.amazonaws.com:5432/d66qvrgjngfgmb');

module.exports = db;
