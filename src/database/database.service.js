const { MongoClient, Collection } = require('mongodb')
const { getEnv } = require("../helper/env/env");
const {dotenv} = require("dotenv");

getEnv();
const client = new MongoClient(process.env.DB_CONNECT_STRING);

async function findADocument(databaseName, collectionName, query) {
    try {
      
      // Get the database and collection on which to run the operation
      const database = client.db(databaseName);
      const coll = database.collection(collectionName);
      const options = {
        // Sort matched documents in descending order by rating
        sort: { "createdAt": -1 },
      };
      // Execute query
      const results = await coll.findOne(query, options);
      return results;
    } catch(e) {
      console.log(e)
      await client.close();
    }
  }
exports.findADocument = findADocument;
