import { inject, injectable } from 'inversify';

import { IConfigService } from './config.iterface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error('[ConfigService]: Неудалось прочитать файл .env или он отсутсвует');
    } else {
      this.logger.log('[ConfigService]: Config .env is load');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
