import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseBoolean } from '../../../common/utilities/env.utility';

@Injectable()
export class PgConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('pgConf.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('pgConf.port'));
  }

  get username(): string {
    return this.configService.get<string>('pgConf.username');
  }

  get password(): string {
    return this.configService.get<string>('pgConf.password');
  }

  get dbName(): string {
    return this.configService.get<string>('pgConf.dbName');
  }

  get dbQueriesDebug(): boolean {
    return parseBoolean(
      this.configService.get<string>('pgConf.dbQueriesDebug'),
    );
  }
}
