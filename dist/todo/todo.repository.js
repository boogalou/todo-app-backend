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
exports.TodoRepository = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const todo_model_1 = __importDefault(require("./todo.model"));
let TodoRepository = class TodoRepository {
    constructor(logger) {
        this.logger = logger;
        this.todoModel = todo_model_1.default;
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('created paylad>>', payload);
            const newTodo = yield this.todoModel.create({
                title: payload.title,
                completed: payload.completed,
                user: payload.userId,
                createdAt: Date.now()
            });
            return newTodo;
        });
    }
    find(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.todoModel.findByIdAndDelete({ _id: todoId });
        });
    }
    findByIdAdnUp(todoId, todoCompleted) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.todoModel.findByIdAndUpdate(todoId, { completed: todoCompleted });
        });
    }
    findAll(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.todoModel.find({ user: userID });
            return response;
        });
    }
};
TodoRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __metadata("design:paramtypes", [Object])
], TodoRepository);
exports.TodoRepository = TodoRepository;
//# sourceMappingURL=todo.repository.js.map