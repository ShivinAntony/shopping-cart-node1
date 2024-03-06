const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Your MongoDB connection string
const dbName = 'shopping'; // Replace with your actual database name

let client;

module.exports = {
    connect: async (callback) => {
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
            callback();
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
        }
    },

    get: () => {
        if (!client) {
            console.error('MongoDB client is not initialized. Make sure to connect first.');
        }
        return client.db(dbName);
    }
};
