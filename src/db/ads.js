const {getDB} = require('./mongo');

const collectionName = 'ads';

async function insertAd(ad){
    const database = await getDB();
    const {insertedId} = await database.collection(collectionName).insertOne(ad);
    return insertedId;
}

async function getAds(){
    const database = await getDB();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    insertAd,
    getAds
}