import mongoose, { Document, Schema } from 'mongoose';
import { USER_MODEL } from './model.constant';
import { IUserModel } from './user.model.interface';

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  name: {type: String, unique: true, required: true},
  password: {type: String, unique: true, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String},
});

const UserModel = mongoose.model<IUserModel>(USER_MODEL, UserSchema);

export default UserModel;