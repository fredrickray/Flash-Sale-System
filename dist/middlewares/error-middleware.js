"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.routeNotFound = exports.ServerError = exports.TooManyRequests = exports.InvalidInput = exports.Conflict = exports.Timeout = exports.Forbidden = exports.Unauthorized = exports.ResourceNotFound = exports.BadRequest = exports.HttpError = void 0;
class HttpError extends Error {
    status;
    details;
    code;
    keyValue;
    constructor(statusCode, message, details = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = statusCode;
        this.details = details;
        this.code = details['code'] || 0;
        this.keyValue = details['keyValue'] || {};
    }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
    constructor(message, details) {
        super(400, message, details);
    }
}
exports.BadRequest = BadRequest;
class ResourceNotFound extends HttpError {
    constructor(message, details) {
        super(404, message, details);
    }
}
exports.ResourceNotFound = ResourceNotFound;
class Unauthorized extends HttpError {
    constructor(message, details) {
        super(401, message, details);
    }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends HttpError {
    constructor(message, details) {
        super(403, message, details);
    }
}
exports.Forbidden = Forbidden;
class Timeout extends HttpError {
    constructor(message, details) {
        super(408, message, details);
    }
}
exports.Timeout = Timeout;
class Conflict extends HttpError {
    constructor(message, details) {
        super(409, message, details);
    }
}
exports.Conflict = Conflict;
class InvalidInput extends HttpError {
    constructor(message, details) {
        super(422, message, details);
    }
}
exports.InvalidInput = InvalidInput;
class TooManyRequests extends HttpError {
    constructor(message, details) {
        super(429, message, details);
    }
}
exports.TooManyRequests = TooManyRequests;
class ServerError extends HttpError {
    constructor(message, details) {
        super(500, message, details);
    }
}
exports.ServerError = ServerError;
const routeNotFound = (req, res, next) => {
    const message = `Route not found`;
    res
        .status(404)
        .json({ success: false, message, method: req.method, resource: req.path });
};
exports.routeNotFound = routeNotFound;
const errorHandler = (err, req, res, _next) => {
    // httpLogger.error(err);
    let statusCode = err.status || 500;
    let cleanedMessage = (statusCode === 500
        ? 'An error occured, please try again later'
        : err.message).replace(/"/g, '');
    console.log('err:', err);
    const responsePayload = {
        success: false,
        message: cleanedMessage,
    };
    if (err instanceof Error) {
        if (err.name === 'ValidationError') {
            cleanedMessage = 'Validation failed';
            responsePayload.message = err.message;
            statusCode = 422;
        }
        else if (err.code && err.code == 11000) {
            const field = Object.keys(err.keyValue);
            cleanedMessage = 'Duplicate key error';
            responsePayload.message = `An account with that ${field} already exists.`;
            statusCode = 409;
        }
    }
    if (err.details != null) {
        responsePayload.details = err.details;
    }
    res.status(statusCode).json(responsePayload);
};
exports.errorHandler = errorHandler;
