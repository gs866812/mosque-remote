import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI; // Use the environment variable for security

let client;
let clientPromise;


if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Set up the MongoDB client
client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

clientPromise = client.connect(); // Establish connection to the MongoDB

export default clientPromise; // Export the client connection
