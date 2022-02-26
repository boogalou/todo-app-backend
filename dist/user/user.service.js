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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const user_entity_1 = require("./user.entity");
const types_1 = require("../types");
require("reflect-metadata");
const http_error_1 = require("../errors/http-error");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(configService, userRepository, tokenService, emailService) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    registration({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_entity_1.UserEntity(name, email);
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(password, Number(salt));
            const activateLink = (0, uuid_1.v4)();
            yield this.emailService.sendMailForActivation(email, `${this.configService.get('API_URL')}api/activate/${activateLink}`);
            const existUser = yield this.userRepository.find(email);
            debugger;
            if (existUser) {
                return null;
            }
            else {
                const createdUser = yield this.userRepository.create(newUser);
                const tokens = this.tokenService.generateToken(newUser);
                yield this.tokenService.saveToken(createdUser.id, tokens.refreshToken);
                return { tokens, user: createdUser };
            }
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.find(email);
            if (!user)
                return null;
            const newUser = new user_entity_1.UserEntity(user.name, user.email, user._id, user.password);
            const result = yield newUser.comparePassword(password);
            if (!result)
                return null;
            const tokens = this.tokenService.generateToken(newUser);
            yield this.tokenService.saveToken(user.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: newUser });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.tokenService.removeToken(refreshToken);
            return token;
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new http_error_1.HttpError(401, 'Unauthorized');
            }
            const userData = this.tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield this.tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw new http_error_1.HttpError(401, 'Unauthorized');
            }
            const user = yield this.userRepository.find(userData.email);
            if (!user) {
                return null;
            }
            const newUser = new user_entity_1.UserEntity(user.name, user.email, user.id);
            const tokens = this.tokenService.generateToken(newUser);
            yield this.tokenService.saveToken(newUser.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: newUser });
        });
    }
    activate(activateLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findLink(activateLink);
            if (!user) {
                throw new http_error_1.HttpError(400, 'Error while trying to activate');
            }
            user.isActivated = true;
            yield user.save();
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepo)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.TokenService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.EmailService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map