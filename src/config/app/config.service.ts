import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('appConf.port'));
  }

  get jwtAccessTokenSecret(): string {
    return this.configService.get<string>('appConf.jwtAccessTokenSecret');
  }

  get jwtRefreshTokenSecret(): string {
    return this.configService.get<string>('appConf.jwtRefreshTokenSecret');
  }

  get jwtAccessTokenExpiration(): string {
    return this.configService.get<string>('appConf.jwtAccessTokenExpiration');
  }

  get jwtRefreshTokenExpiration(): string {
    return this.configService.get<string>('appConf.jwtRefreshTokenExpiration');
  }
}
