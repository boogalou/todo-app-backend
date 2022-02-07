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
exports.TokenService = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const config_service_1 = require("../config/config.service");
const types_1 = require("../types");
const jsonwebtoken_1 = require("jsonwebtoken");
let TokenService = class TokenService {
    constructor(configService, tokenRepo) {
        this.configService = configService;
        this.tokenRepo = tokenRepo;
    }
    generateToken({ name, email, password }) {
        const accessToken = (0, jsonwebtoken_1.sign)({ name, email, password }, this.configService.get('JWT_ACCESS'));
        const refreshToken = (0, jsonwebtoken_1.sign)({ name, email }, this.configService.get('JWT_REFRESH'));
        return { accessToken, refreshToken };
    }
    saveToken(userID, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.tokenRepo.find(userID);
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                yield tokenData.save();
            }
            const token = yield this.tokenRepo.create(userID, refreshToken);
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield this.tokenRepo.removeToken(refreshToken);
            return tokenData;
        });
    }
};
TokenService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TokenRepo)),
    __metadata("design:paramtypes", [config_service_1.ConfigService, Object])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map