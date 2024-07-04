import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../../config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(['Unauthorized']);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.appConfigService.jwtAccessTokenSecret,
      });
      request['user'] = {
        email: payload.email,
        id: payload.sub,
      };
    } catch {
      throw new UnauthorizedException(['Unauthorized']);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
