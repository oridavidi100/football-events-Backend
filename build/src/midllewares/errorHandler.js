"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerMiddleware(err, req, res, next) {
    if (!err.status) {
        return res.status(500).send({ error: 'internal server error' });
    }
    return res.status(err.status).send({ error: err.message });
}
exports.default = errorHandlerMiddleware;
