import { Document } from 'mongoose';

export interface IUserModel extends Document {
  email: string;
  name: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}