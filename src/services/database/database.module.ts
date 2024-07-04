import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgConfigModule, PgConfigService } from '../../config';
import { Logger } from '@nestjs/common';

const logger = new Logger('Sequelize');

@Module({
  imports: [
    PgConfigModule,
    SequelizeModule.forRootAsync({
      imports: [PgConfigModule],
      useFactory: async (config: PgConfigService) => ({
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.dbName,
        logging: config.dbQueriesDebug ? (msg) => logger.debug(msg) : false,
        autoLoadModels: true,
        synchronize: false,
        define: {
          underscored: true,
        },
      }),
      inject: [PgConfigService],
    }),
  ],
})
export class DatabaseModule {}
