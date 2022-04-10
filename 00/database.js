const Datastore = require('nedb');

const database = new Datastore('storage.db');
database.loadDatabase();


module.exports = database