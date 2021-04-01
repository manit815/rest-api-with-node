const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let db = null;

async function startDB(){
    const mongo = new MongoMemoryServer();
    const mongoDBURL = await mongo.getConnectionString();
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    db = connection.db();
}

async function getDB(){
    if(!db) await startDB();
    return db;
}

module.exports = {
    getDB,
    startDB
}