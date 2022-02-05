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
const user_repo_1 = require("./user/user.repo");
const token_service_1 = require("./token/token.service");
const token_repo_1 = require("./token/token.repo");
exports.appBindingsContainer = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.TYPES.UserController).to(user_controller_1.UserController);
    bind(types_1.TYPES.UserService).to(user_service_1.UserService);
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.DatabaseService).to(database_service_1.DatabaseService).inSingletonScope();
    bind(types_1.TYPES.UserRepo).to(user_repo_1.UserRepo).inSingletonScope();
    bind(types_1.TYPES.TokenService).to(token_service_1.TokenService).inSingletonScope();
    bind(types_1.TYPES.TokenRepo).to(token_repo_1.TokenRepo).inSingletonScope();
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