const pgp = require('pg-promise')(/*option*/);
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL || 'postgres://ltyskbuvabehtk:d226dfbb7505940fc20fdf33e58467487311b31ff7e325903f2ad372659dc4e3@ec2-54-75-225-143.eu-west-1.compute.amazonaws.com:5432/d4rjttmi02j8m9');

module.exports = db;
