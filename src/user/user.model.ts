import mongoose, { Schema } from 'mongoose';
import { TODO_MODEL } from '../todo/todo.model';
import { USER_MODEL } from './model.constant';
import { IUserModel } from './user.model.interface';


const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: TODO_MODEL,
  }],
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
  });

const UserModel = mongoose.model<IUserModel>(USER_MODEL, UserSchema);

export default UserModel;