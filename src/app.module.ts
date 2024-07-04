import { Module } from '@nestjs/common';
import { DatabaseModule } from './services/database/database.module';
import { AppConfigModule, AppConfigService, PgConfigModule } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { WorkFieldModule } from './api/work-field/work-field.module';

@Module({
  imports: [
    ConfigModule,
    AppConfigModule,
    PgConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    WorkFieldModule,
  ],
  providers: [ConfigService, AppConfigService, AppConfigService],
})
export class AppModule {}
