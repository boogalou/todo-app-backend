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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("./types");
const user_controller_1 = require("./user/user.controller");
const database_service_1 = require("./Database/database.service");
const config_service_1 = require("./config/config.service");
let App = class App {
    constructor(logger, exceptionFilter, userController, configService, databaseService) {
        this.logger = logger;
        this.exceptionFilter = exceptionFilter;
        this.userController = userController;
        this.configService = configService;
        this.databaseService = databaseService;
        this.app = (0, express_1.default)();
        this.PORT = this.configService.get('PORT');
    }
    useMiddleware() {
        this.app.use((0, body_parser_1.json)());
    }
    useRoutes() {
        this.app.use('/', this.userController.router);
    }
    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.useMiddleware();
                this.useRoutes();
                this.useExceptionFilters();
                yield this.databaseService.connect();
                this.server = this.app.listen(this.PORT, () => this.logger.log(`server was started on http://localhost:${this.PORT}`));
            }
            catch (err) {
                this.logger.error(err);
            }
        });
    }
};
App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ExceptionFilter)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserController)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DatabaseService)),
    __metadata("design:paramtypes", [Object, Object, user_controller_1.UserController,
        config_service_1.ConfigService,
        database_service_1.DatabaseService])
], App);
exports.App = App;
//# sourceMappingURL=App.js.map