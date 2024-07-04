import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { AppConfigModule, AppConfigService } from '../../config';

@Module({
  imports: [AppConfigModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, AppConfigService],
})
export class AuthModule {}
