import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AppConfigModule } from '../../config';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkField } from '../work-field/entities/work-field.entity';

@Module({
  imports: [
    AppConfigModule,
    JwtModule,
    SequelizeModule.forFeature([User, WorkField]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
