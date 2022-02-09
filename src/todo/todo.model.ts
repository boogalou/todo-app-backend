import mongoose, { Schema } from "mongoose";
import { USER_MODEL } from "../user/model.constant";
import { ITodoModel } from './types/todo.model.interface';

export const TODO_MODEL = 'Todo';

const TodoSchema = new Schema({
  title: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_MODEL,
  }
});

const TodoModel = mongoose.model<ITodoModel>(TODO_MODEL, TodoSchema);
export default  TodoModel