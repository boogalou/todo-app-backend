import mongoose, { Schema, Document } from 'mongoose';
import { ITokenModel } from './token.model.interface';
import { TOKEN_MODEL } from './model.constant';

const TokenSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User',},
  refreshToken: {type: String, required: true,},
});

const TokenModel = mongoose.model<ITokenModel & Document>(TOKEN_MODEL, TokenSchema);

export default TokenModel;