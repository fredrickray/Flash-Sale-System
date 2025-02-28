"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const dotenv_config_1 = __importDefault(require("./dotenv-config"));
let mongoServer;
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        console.log('Already connected to MongoDB. Disconnecting first...');
        await mongoose_1.default.disconnect();
    }
    // Check if not connected
    try {
        if (process.env.NODE_ENV === 'test') {
            mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose_1.default.connect(uri);
            console.log(`Connected to in-memory MongoDB for testing`);
        }
        else {
            // Use normal MongoDB URL for dev/prod
            const dbUrl = dotenv_config_1.default.Database.url;
            await mongoose_1.default.connect(dbUrl);
            console.log(`Connected to MongoDB Successfully`);
        }
        // const dbUrl = process.env.NODE_ENV === 'test' ? Config.mongo.testUrl as string : Config.mongo.url as string
        // await mongoose.connect(dbUrl);
        console.log(`Connected to MongoDB Successfully`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    if (mongoServer) {
        await mongoServer.stop();
        console.log('Stopped in-memory MongoDB');
    }
};
exports.disconnectDB = disconnectDB;
const clearDatabase = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        const collections = mongoose_1.default.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({}); // Clear data from all collections
        }
        console.log('Test database cleared');
    }
};
exports.clearDatabase = clearDatabase;
