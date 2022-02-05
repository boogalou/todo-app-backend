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
let UserService = class UserService {
    constructor(configService, userRepository, tokenService) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    registration({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_entity_1.UserEntity(name, email);
            const salt = this.configService.get('SALT');
            yield newUser.setPassword(password, Number(salt));
            const existUser = yield this.userRepository.find(email);
            if (existUser) {
                return null;
            }
            else {
                const createdUser = yield this.userRepository.create(newUser);
                console.log('registration:', createdUser);
                const tokens = this.tokenService.generateToken(newUser);
                console.log('createdUser.id:', createdUser.id);
                const res = yield this.tokenService.saveToken(createdUser.id, tokens.refreshToken);
                console.log('registration res:', res);
                return newUser;
            }
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            const user = yield this.userRepository.find(email);
            if (!user)
                return null;
            const newUser = new user_entity_1.UserEntity(user.email, user.name, user.password);
            const result = yield newUser.comparePassword(password);
            if (!result)
                return null;
            const tokens = this.tokenService.generateToken(newUser);
            console.log('tokens:', tokens);
            console.log('ID', user.id);
            console.log('tokens.refreshToken', tokens.refreshToken);
            const res = yield this.tokenService.saveToken(user.id, tokens.refreshToken);
            return newUser;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    activate(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepo)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.TokenService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map