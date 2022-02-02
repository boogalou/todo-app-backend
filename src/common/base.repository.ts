import { injectable } from 'inversify';
import {Document, Model} from 'mongoose'


@injectable()
export abstract class BaseRepository<T extends Document> {


}