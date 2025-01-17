// Question:  Pourquoi créer des services séparés ?
// Réponse:

const { ObjectId } = require("mongodb");
const db = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  const document = await db
    .getMongoDb()
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
  return document;
}
async function findMany(collection, query = {}) {
  const documents = await db
    .getMongoDb()
    .collection(collection)
    .find(query)
    .toArray();
  return documents;
}
async function insertOne(collection, data) {
  const document = await db.getMongoDb().collection(collection).insertOne(data);
  return document;
}
async function updateOne(collection, id, data) {
  const document = await db
    .getMongoDb()
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, data);
  return document;
}
async function deleteOne(collection, id) {
  const document = await db
    .getMongoDb()
    .collection(collection)
    .deleteOne({ _id: new ObjectId(id) });
  return document;
}
async function aggregate(collection, pipeline) {
  const documents = await db
    .getMongoDb()
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
  return documents;
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findMany,
  insertOne,
  updateOne,
  deleteOne,
  aggregate,
};
