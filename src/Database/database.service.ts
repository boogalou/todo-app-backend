import { Mongoose } from 'mongoose';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { IConfigService } from '../config/config.iterface';


@injectable()
export class DatabaseService {
  mongoose: Mongoose;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,

  ) {
    this.mongoose = mongoose;
  }

  async connect() {
    try {
      const URI = this.configService.get('MONGODB_URI')
      await this.mongoose.connect(URI);
      this.logger.log('[DatabaseService] Success connect to database');
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(`[MongoService] Connect to database failure ${err.message}`);
      }
    }
  }
}
