"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const passport_1 = __importDefault(require("passport"));
const APIError_1 = __importDefault(require("./utils/APIError"));
const routes_1 = __importDefault(require("./routes"));
const createExpressApp = () => {
    try {
        const app = (0, express_1.default)();
        app.disable('x-powered-by');
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)());
        // app.use(timeout('15s'));
        app.use(passport_1.default.initialize());
        // app.use(morgan('combined', { stream, immediate: true }));
        app.get('/favicon.ico', (req, res) => res.status(204));
        // Application API Routes
        app.use('/api', routes_1.default);
        // Handle invalid routes
        app.get('*', (req, res, next) => {
            next(new APIError_1.default('Invalid API path', http_status_1.default.NOT_FOUND));
        });
        return app;
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        throw err;
    }
};
exports.default = createExpressApp;
