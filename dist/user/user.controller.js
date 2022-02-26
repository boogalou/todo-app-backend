"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const user_registration_dto_1 = require("./dto/user-registration.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const http_error_1 = require("../errors/http-error");
const validate_middleware_1 = require("../common/validate.middleware");
let UserController = class UserController extends base_controller_1.BaseController {
    constructor(loggerService, userService, configService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.userService = userService;
        this.configService = configService;
        this.bindRoutes([
            {
                path: '/registration',
                method: 'post',
                func: this.registration,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_registration_dto_1.UserRegistrationDto)],
            },
            {
                path: '/login',
                method: 'post',
                func: this.login,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_login_dto_1.UserLoginDto)],
            },
            {
                path: '/logout',
                method: 'post',
                func: this.logout,
                middlewares: [],
            },
            {
                path: '/activate/:link',
                method: 'get',
                func: this.activate,
                middlewares: [],
            },
            {
                path: '/refresh',
                method: 'get',
                func: this.refresh,
                middlewares: [],
            },
        ]);
    }
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const response = yield this.userService.registration({ name, email, password });
            res.cookie('refreshToken', response === null || response === void 0 ? void 0 : response.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            if (!response) {
                return next(new http_error_1.HttpError(401, 'Пользователь с таким email уже существует'));
            }
            this.send(res, 201, response);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const loginData = yield this.userService.login({ email, password });
            res.cookie('refreshToken', loginData === null || loginData === void 0 ? void 0 : loginData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            this.send(res, 200, loginData);
            if (!loginData) {
                return next(new http_error_1.HttpError(401, 'Пользователь с таким email не найден'));
            }
        });
    }
    logout({ cookies }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = cookies;
            const token = yield this.userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return this.ok(res, 200);
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const tokenData = yield this.userService.refreshToken(refreshToken);
                if (!tokenData) {
                    return null;
                }
                res.cookie('refreshToken', tokenData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
                this.send(res, 200, tokenData);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activateLink = req.params.link;
                const response = yield this.userService.activate(activateLink);
                const redirectLink = this.configService.get('CLIENT_URL');
                res.redirect(redirectLink);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map