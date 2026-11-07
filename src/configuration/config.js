const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGO_URI,
        db: {
            dbName: process.env.DB_NAME || 'java63'
        }
    }
};

if (!config.mongodb.uri) {
    throw new Error('MONGO_URI environment variable is not set');
}

export default config;