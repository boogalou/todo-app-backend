"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    execute(req, res, next) {
        if (req.user) {
            return next();
        }
        else {
            res.status(401).json({ message: `Вы не авторизовыны` });
        }
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map