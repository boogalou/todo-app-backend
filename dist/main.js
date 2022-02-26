"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.appContainer = exports.appBindingsContainer = void 0;
require("reflect-metadata");
const App_1 = require("./App");
const inversify_1 = require("inversify");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const exception_filter_1 = require("./errors/exception.filter");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const config_service_1 = require("./config/config.service");
const database_service_1 = require("./Database/database.service");
const user_repository_1 = require("./user/user.repository");
const token_service_1 = require("./token/token.service");
const token_repo_1 = require("./token/token.repo");
const email_service_1 = require("./email/email.service");
const todo_controller_1 = require("./todo/todo.controller");
const todo_service_1 = require("./todo/todo.service");
const todo_repository_1 = require("./todo/todo.repository");
exports.appBindingsContainer = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.TYPES.UserController).to(user_controller_1.UserController);
    bind(types_1.TYPES.UserService).to(user_service_1.UserService);
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.DatabaseService).to(database_service_1.DatabaseService).inSingletonScope();
    bind(types_1.TYPES.UserRepo).to(user_repository_1.UserRepository).inSingletonScope();
    bind(types_1.TYPES.TokenService).to(token_service_1.TokenService).inSingletonScope();
    bind(types_1.TYPES.TokenRepo).to(token_repo_1.TokenRepo).inSingletonScope();
    bind(types_1.TYPES.EmailService).to(email_service_1.EmailService).inSingletonScope();
    bind(types_1.TYPES.TodoController).to(todo_controller_1.TodoController).inSingletonScope();
    bind(types_1.TYPES.TodoService).to(todo_service_1.TodoService);
    bind(types_1.TYPES.TodoRepository).to(todo_repository_1.TodoRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(App_1.App);
});
function main() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindingsContainer);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = main(), exports.appContainer = _a.appContainer, exports.app = _a.app;
//# sourceMappingURL=main.js.map