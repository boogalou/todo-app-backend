import mongoose, { Schema } from 'mongoose';
import { ITokenModel } from './types/token.model.interface';

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },

  refreshToken: {
    type: String, required: true,
  },
});

const TokenModel = mongoose.model<ITokenModel>('tokens', TokenSchema);

export default TokenModel;