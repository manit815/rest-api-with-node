const {getDB} = require('./mongo');
const {objectID, ObjectID} = require('mongodb');

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

async function deleteAd(id){
    const database = await getDB();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    })
}

async function updateAd(id, ad){
    const database = await getDB();
    delete ad._id;
    await database.collection(collectionName).update(
        {_id: new ObjectID(id)},
        {$set: {
            ...ad,
        }}
    )
}

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
}