"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
class TodoEntity {
    constructor(_title, _completed, _userId) {
        this._title = _title;
        this._completed = _completed;
        this._userId = _userId;
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get title() {
        return this._title;
    }
    get completed() {
        return this._completed;
    }
    get createdAt() {
        return this._createdAt;
    }
    set id(id) {
        this._id = id;
    }
    set title(title) {
        this._title = title;
    }
    set completed(completed) {
        this._completed = completed;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
}
exports.TodoEntity = TodoEntity;
//# sourceMappingURL=todo.entity.js.map