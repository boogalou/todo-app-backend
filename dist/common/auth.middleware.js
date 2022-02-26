"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthMiddleware {
    constructor(secret) {
        this.secret = secret;
    }
    execute(req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            (0, jsonwebtoken_1.verify)(token, this.secret, (err, payload) => {
                if (err) {
                    console.error(err);
                    next();
                }
                else if (payload) {
                    const tokenData = (0, jsonwebtoken_1.decode)(token);
                    req.user = tokenData.email;
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map