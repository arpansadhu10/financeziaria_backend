"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createMongooseConnection = () => new Promise((resolve, reject) => {
    mongoose_1.default.connect(String(process.env.DB_CONNECTION_URI));
    const db = mongoose_1.default.connection;
    db.on('error', () => {
        reject(new Error('Unable to connect to database'));
    });
    db.once('open', () => {
        console.log('Connected to database');
        resolve(db);
    });
});
exports.default = createMongooseConnection;
