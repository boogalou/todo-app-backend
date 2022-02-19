import mongoose, { Schema } from 'mongoose';
import { ITodoModel } from './types/todo.model.interface';

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
    ref:"User"
  },

  createdAt: Date,

});

const TodoModel = mongoose.model<ITodoModel>('Todo', TodoSchema);
export default TodoModel;