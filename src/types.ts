import { TodoController } from "./todo/todo.controller";

export const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseService: Symbol.for('DatabaseMongoService'),
  UserRepo: Symbol.for('UserRepo'),
  TokenService: Symbol.for('TokenService'),
  TokenRepo: Symbol.for('TokenRepo'),
  EmailService: Symbol.for('EmailService'),
  TodoController: Symbol.for('TodoController'),
  TodoService: Symbol.for('TodoService'),
  TodoRepository: Symbol.for('TodoRepository'),
};
