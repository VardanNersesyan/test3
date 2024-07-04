import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PgConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.number().default(5432),
        PG_USER: Joi.string(),
        PG_PASSWORD: Joi.string(),
        PG_DB_NAME: Joi.string().required(),
        DB_QUERIES_DEBUG: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, PgConfigService],
  exports: [ConfigService, PgConfigService],
})
export class PgConfigModule {}
