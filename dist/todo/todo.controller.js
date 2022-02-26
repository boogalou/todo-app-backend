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
exports.TodoController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const exception_filter_1 = require("../errors/exception.filter");
const todo_service_1 = require("./todo.service");
const auth_guard_1 = require("../common/auth.guard");
let TodoController = class TodoController extends base_controller_1.BaseController {
    constructor(loggerService, todoService, exceptionFilter) {
        super(loggerService);
        this.loggerService = loggerService;
        this.todoService = todoService;
        this.exceptionFilter = exceptionFilter;
        this.bindRoutes([
            {
                path: '/todos/newTodo',
                method: 'post',
                func: this.create,
                middlewares: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/todos/delete/:id',
                method: 'delete',
                func: this.delete,
                middlewares: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/todos/update',
                method: 'patch',
                func: this.update,
                middlewares: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/todos/:id',
                method: 'get',
                func: this.getAll,
                middlewares: [new auth_guard_1.AuthGuard()],
            },
        ]);
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                if (!payload) {
                    this.send(res, 401, `Непрдвиденный сбой`);
                }
                const newTodo = yield this.todoService.create(payload);
                if (newTodo) {
                    this.send(res, 201, newTodo);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoId = Object.values(req.params)[0];
                const response = yield this.todoService.delete(todoId);
                this.send(res, 201, { response });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, completed } = req.body.payload;
                yield this.todoService.update(_id, completed);
                this.send(res, 201, { message: 'ok' });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const userID = Object.values(req.params).join('');
                console.log(userID);
                const response = yield this.todoService.findAll(userID);
                console.log(response);
                this.send(res, 200, response);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
TodoController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TodoService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ExceptionFilter)),
    __metadata("design:paramtypes", [Object, todo_service_1.TodoService,
        exception_filter_1.ExceptionFilter])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map