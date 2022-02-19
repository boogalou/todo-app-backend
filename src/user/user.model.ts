import mongoose, { Schema } from 'mongoose';
import { IUserModel } from './types/user.model.interface';


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
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  }
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;