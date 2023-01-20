"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = require("joi");
const jsonwebtoken_1 = require("jsonwebtoken");
const APIError_1 = __importDefault(require("../utils/APIError"));
// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = false;
const errorHandler = (err, _req, res, next) => {
    var _a;
    // Check for JWT authentication error from passport
    if ((err === null || err === void 0 ? void 0 : err.name) === 'AuthenticationError') {
        console.log(err.message);
        res.status(http_status_1.default.UNAUTHORIZED).json({
            message: 'Unauthorized request',
            code: http_status_1.default.UNAUTHORIZED,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
        });
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        console.log(err.message);
        res.status(http_status_1.default.UNAUTHORIZED).json({
            message: 'Unauthenticated request',
            code: http_status_1.default.UNAUTHORIZED,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
        });
    }
    else if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        console.log(err.message);
        res.status(http_status_1.default.UNAUTHORIZED).json({
            message: 'Token expired',
            code: http_status_1.default.UNAUTHORIZED,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
        });
    }
    // Check for validation error from Joi
    else if ((err === null || err === void 0 ? void 0 : err.error) instanceof joi_1.ValidationError) {
        const error = err === null || err === void 0 ? void 0 : err.error;
        console.log(error.message);
        console.log(JSON.stringify(error.details, null, 2));
        res.status(http_status_1.default.BAD_REQUEST).json({
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Something went wrong',
            code: http_status_1.default.BAD_REQUEST,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
            data: isDevelopment ? { error: error === null || error === void 0 ? void 0 : error.details } : undefined,
        });
    }
    else if (err instanceof APIError_1.default) {
        console.log(err.message);
        res.status(err.status).json({
            message: err.message,
            code: err.status,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
        });
    }
    else if (err instanceof Error) {
        console.log(err.message);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            message: err.message,
            code: http_status_1.default.INTERNAL_SERVER_ERROR,
            stack_trace: isDevelopment ? err === null || err === void 0 ? void 0 : err.stack : undefined,
        });
    }
    // eslint-disable-next-line
    if (isDevelopment)
        console.error(err);
    next();
};
exports.default = errorHandler;
